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
    public function participate(Request $request, $id) {
        $event = Event::find($id);
        $user = Auth::user();
        
        $participationPossible = false;
        
        if($event != null) {
            if($event->public) {
                $participationPossible = true;
            } else {
                $guests = $event->invitations;
                $invite = false;
                
                foreach($guests as $guest) {
                    if($guest->id == $user->id)
                        $invite = true;
                }
                
                if($invite) {
                    $participationPossible = true;
                } else 
                    return response()->error('Vous n\'avez pas le droit de participer à cet événement.', 401);
            }
            
            if($participationPossible) {
                $participationExistante = Participation::where('idUser', '=', $user->id)->where('idActivity', '=', $event->id)->first();
                
                if($participationExistante != null) {
                    return response()->error('Votre participation a déjà été enregistrée.', 400); 
                } else {
                    $participation = new Participation();
                    $participation->idUser = $user->id;
                    $participation->idActivity = $id;
                    $participation->save();    

                    $invitation = Invitation::where('idUser', '=', $user->id)->where('idActivity', '=', $event->id)->first();

                    if($invitation != null) {
                        $invitation->answered = true;
                        $invitation->save();
                    }

                    return response()->success('Votre participation a bien été prise en compte.', 201);  
                }
            }
        } else
            return response()->error('Aucun événement correspondant à cet id n\'a été trouvé.', 204);
    }
    
    /**
     * Methode permettant de retirer la participation d'un utilisateur a un evenement
     * route : events/:id/participate
     * methode : DELETE
     */
    public function removeParticipation(Request $request, $id) {
        $event = Event::find($id);
        $user = Auth::user();
        
        $participation = DB::table('participation')->where('idUser', '=', $user->id)->where('idActivity', '=', $event->id);
        
        if($participation != null) {
            $participation->delete();
            
            $invitation = Invitation::where('idUser', '=', $user->id)->where('idActivity', '=', $event->id)->first();
            
            if($invitation != null && $invitation->answered = false) {
                $invitation->answered = true;
                $invitation->save();
            }
            
            return response()->success('La participation a bien été supprimée.');
        } else
            return response()->error('La participation n\'a pas été trouvée.', 204);   
    }
}
