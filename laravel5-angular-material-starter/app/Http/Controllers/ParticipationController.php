<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Webpatser\Uuid\Uuid;
use Auth;

use App\Event;
use App\User;
use App\Participation;
use App\Invitation;
use Illuminate\Support\Facades\DB;

class ParticipationController extends Controller
{
    /**
     * Methode permettant a un utilisateur de participer a un evenement
     * route : events/:id/participate
     * methode : POST
     */
    public function participate(Request $request, $id)
    {
        $event = Event::find($id);
        $user = Auth::user();

        $participationPossible = false;

        if ($event != null) {
            if ($event->public) {
                $participationPossible = true;
            } else {
                $guests = $event->invitations;
                $invite = false;

                foreach ($guests as $guest) {
                    if ($guest->id == $user->id) {
                        $invite = true;
                        break;
                    }
                }

                if ($invite) {
                    $participationPossible = true;
                } else
                    return response()->error('Vous n\'avez pas le droit de participer à cet événement.', 401);
            }

            if ($participationPossible) {
                $participationExistante = Participation::where('idUser', '=', $user->id)->where('idActivity', '=', $event->id)->first();

                if ($participationExistante != null) {
                    return response()->error('Votre participation a déjà été enregistrée.', 400);
                } else {
                    $participations = $user->eventsParticipations;

                    $chevauchementParticipation = null;

                    foreach ($participations as $participation) {
                        if (!(($participation->dateFin < $event->dateDebut) || ($event->dateFin < $participation->dateDebut))) {
                            $chevauchementParticipation = $participation;
                            break;
                        }
                    }

                    if ($chevauchementParticipation == null) {
                        $participation = new Participation();
                        $participation->idUser = $user->id;
                        $participation->idActivity = $id;
                        $participation->save();

                        $invitation = Invitation::where('idUser', '=', $user->id)->where('idActivity', '=', $event->id);
                        $invitationRow = $invitation->first();

                        if ($invitationRow != null) {
                            $invitation->answered = true;
                            $invitation->save();
                        }

                        return response()->success('Votre participation a bien été prise en compte.', 201);
                    } else {
                        return response()->json(array('message' => 'Vous avez déjà une participation enregistrée se déroulant au même moment.', 'alreadyExistingEvent' => $chevauchementParticipation), 400);
                    }
                }
            }
        } else
            return response()->error('Aucun événement correspondant à cet id n\'a été trouvé.', 404);
    }

    /**
     * Methode permettant de retirer la participation d'un utilisateur a un evenement
     * route : events/:id/participate
     * methode : DELETE
     */
    public function removeParticipation(Request $request, $id)
    {
        $event = Event::find($id);
        $user = Auth::user();

        $participation = DB::table('participation')->where('idUser', '=', $user->id)->where('idActivity', '=', $event->id);
        $participationRow = $participation->first();

        if ($participationRow != null) {
            $participation->delete();

            $invitation = Invitation::where('idUser', '=', $user->id)->where('idActivity', '=', $event->id)->first();

            if ($invitation != null && $invitation->answered = false) {
                $invitation->answered = true;
                $invitation->save();
            }

            return response()->success('La participation a bien été supprimée.');
        } else
            return response()->error('La participation n\'a pas été trouvée.', 404);
    }

    public function findAll(Request $request, $id)
    {
        $event = Event::find($id);

        if ($event == null)
            return response()->error('L\'évenement n\'a pas été trouvée.', 404);


        //verification de l'accessibilité a l'evenement
        if (!$event->isAccessible())
            return response()->error("L'événement est privé", 401);

        $participants = $event->participants;

        if ($participants->count() == 0)
            return response()->noContent("Il n'y a aucun participant sur cet événement.");
        else
            return response()->success(compact('participants'));
    }

    /**
     * Methode permettant de recuperer les evenements auxquels participe un utilisateur
     * route : users/:id/participations
     * methode : GET
     */
    public function findByUser(Request $request, $id){
        if($id == "self"){
            $user = User::findAuthorOfRequest();
            if($user==null)
                return response()->unauthorized();
            $authorOfRequest = $user;
        } else {
            $user = User::find($id);
            $authorOfRequest = User::findAuthorOfRequest();
            if ($user == null)
                return response()->error("Aucun utilisateur ne correspond a l'identifiant donné.", 404);
        }

        if(isset($request->begin) && isset($request->end)){
            $this->validate($request, [
                'begin' => 'required | date_format:Y-m-d H:i:s',
                'end' => 'required | date_format:Y-m-d H:i:s',
            ]);
            $begin = $request->begin;
            $end = $request->end;
            $events = $user->eventsParticipations()
                ->where('dateDebut', '<=', $begin)
                ->where('dateFin', '>', $begin)->get();

            if($events->count() == 0)
                $events = $user->eventsParticipations()
                    ->where('dateDebut', '>=', $begin)
                    ->where('dateDebut', '<', $end)->get();
        } else
            $events = $user->eventsParticipations;

        if($events->count() == 0)
            return response()->noContent();

        if($user != $authorOfRequest){
            $eventsFilter = array();
            foreach ($events as $event){
                if($event->isAccessible($authorOfRequest))
                    array_push($eventsFilter, $event);
            }
            if(empty($eventsFilter))
                return response()->noContent();

            return response()->success(compact('eventsFilter'));
        }

        return response()->success(compact('events'));
    }
    
    /**
     * Methode permettant de recuperer la liste des participants d'un evenement via son id.
     * @param $id id de l'evenement
     * @return mixed reponse contenant la liste des participants de l'evenement.
     */
    public function findAll($id){
        $event = Event::find($id);
        
        if($event == null)
            return response()->error("Aucun événement correspondant a l'identifiant n'a été trouvé", 404);

        //verification de l'accessibilité a l'evenement
        if(!$event->isAccessible())
            return response()->error("L'événement est privé", 401);

        $participants = $event->participants;
        if($participants->count() == 0)
            return response()->noContent("Il n'y a aucun participant sur cet événement.");
        else
            return response()->success(compact('participants'));
    }
}
