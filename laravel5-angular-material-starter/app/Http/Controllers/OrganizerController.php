<?php
/**
 * Created by PhpStorm.
 * User: Dylan
 * Date: 25/03/2017
 * Time: 15:24
 */

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Organizer;
use DateTime;
use App\Event;
use App\User;
use Auth;

class OrganizerController extends Controller
{
    /**
     * Fonction de creation d'un organisateur
     * @param Request $request
     * @param $id id de l'evenement sur lequel on souhaite ajouter l'organisateur
     * @return reponse contenant l'evenement si celui-ci a ete cree.
     */
    public function create(Request $request, $id)
    {
        //On verifie qu'il y a un id user dans la requete
        $this->validationCreate($request);

        $idUser = trim($request->input('idUser'));

        //On verifie que l'evenement existe et on le recupere
        $event = Event::find($id);
        if($event == null)
            return response()->error("Événement non trouvé", 404);

        $listOrganizers = $event->organizers;

        //On verifie que l'utilisateur qui fait la requete a le droit de la faire
        $authorOfRequest = Auth::user();
        if(!$authorOfRequest->isOrganizer($event, $listOrganizers))
            return response()->unauthorized();

        //On regarde si l'utilisateur a ajouter est deja organisateur
        $userToAdd = User::find($idUser);
        if($userToAdd == null) //Si on ne trouve pas d'utilisateur avec cet id on abandonne
            return response()->error("Aucun utilisateur ne correspond à l'identifiant donné", 400);
        if($userToAdd->isOrganizer($event, $listOrganizers))
            return response()->error("L'utilisateur est deja organisateur.", 400);

        $event->organizers()->attach($idUser);
        $event->participants()->attach($idUser);
        $listOrganizers->push($userToAdd);
        return response()->created($listOrganizers);
    }

    /**
     * Methode permettant de supprimer un organisateur via l'id de l'evenement et l'id de l'utilisateur
     * @param $idEvent id de l'evenement
     * @param $idUser id de l'utilisateur que l'on souhaite enlever des organisateurs
     */
    public function delete($idEvent, $idUser){
        $event = Event::find($idEvent);
        if($event == null)
            return response()->error("Événement inexistant.", 404);

        $userToRevoke = User::find($idUser);
        if($userToRevoke == null)
            return response()->error("Utilisateur inexistant.", 404);

        //on verifie qu'il y a au moins 2 organizateurs
        $organizers = $event->organizers;
        if($organizers->count() < 2)
            return response()->error("Il doit rester au moins 1 organisateur sur un événement", 403);

        //On verifie que l'auteur de la requete a le droit de supprimer un organisateur
        $authorOfRequest = Auth::user();
        if(!$authorOfRequest->isOrganizer($event, $organizers))
            return response()->unauthorized();

        $event->organizers()->detach($idUser);

        return response()->success("Organisateur supprimé.");
    }


    /**
     * Methode permettant de recuperer la liste des organisateurs d'un evenement via son id.
     * @param $id id de l'evenement
     * @return mixed reponse contenant la liste des organisateurs de l'evenement.
     */
    public function findAll($id){
        $event = Event::find($id);
        if($event == null)
            return response()->noContent("Aucun événement correspondant a l'identifiant n'a été trouvé");

        //verification de l'accessibilité a l'evenement
        if(!$event->isAccessible())
            return response()->error("L'événement est privé", 401);

        $organizers = $event->organizers;
        if($organizers->count() == 0)
            return response()->noContent("Il n'y a aucun organisateur sur cet événement.");
        else
            return response()->success(compact('organizers'));
    }

    /**
     * Methode permettant de recuperer les evenements organisés par un utilisateur
     * route : users/:id/organizations?begin&end
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
            $events = $user->eventsOrganization()
                        ->where('dateDebut', '<=', $begin)
                        ->where('dateFin', '>', $begin)->get();
            if($events->count() == 0)
                $events = $user->eventsOrganization()
                    ->where('dateDebut', '>=', $begin)
                    ->where('dateDebut', '<', $end)->get();
        } else
            $events = $user->eventsOrganization;

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

    private function validationCreate($request){
        $this->validate($request, [
            'idUser' => 'required | string'
        ]);
    }
}