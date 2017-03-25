<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Webpatser\Uuid\Uuid;
use Auth;

use App\Event;
use App\User;
use App\Invitation;
use Illuminate\Support\Facades\DB;

class InvitationController extends Controller
{
    /**
     * Methode permettant a un utilisateur d'inviter un autre utilisateur a participer a un evenement
     * route : events/:id/invitation
     * methode : POST
     */
    public function invitation(Request $request, $id) {
        $event = Event::find($id);
        $user = Auth::user();
        
        $invitationPossible = false;
                
        if($event != null) {
            if($event->public) {
                $invitationPossible = true;
            } else {
                $organizers = $event->organizers;
                $organizer = false;
                
                foreach($organizers as $organizer) {
                    if($organizer->id == $user->id) {
                        $organizer = true;
                        break;
                    } 
                }
                
                if($organizer) {
                    $invitationPossible = true;
                } else 
                    return response()->error('Vous n\'avez pas le droit d\'inviter des gens à cet événement.', 401);
            }
            
            if($invitationPossible) {
                $this->validate($request, [
                    'idUser' => 'required',
                ]);
                
                $utilisateurInvite = User::find($request->idUser);
                
                if($utilisateurInvite != null) {
                     $invitationExistante = Invitation::where('idUser', '=', $utilisateurInvite->id)->where('idActivity', '=', $event->id)->first();
                
                    if($invitationExistante != null) {
                        return response()->error('L\'utilisateur a déjà été invité.', 400); 
                    } else {
                        $invitation = new Invitation();
                        $invitation->idUser = $utilisateurInvite->id;
                        $invitation->idActivity = $id;
                        $invitation->answered = false;
                        $invitation->save();
  
                        return response()->success('Votre invitation a bien été créée.', 201);  
                    }   
                } else {
                    return response()->error('L\'utilisateur que vous souhaitez inviter n\'a pas été trouvé.', 404);
                }
            }
        } else
            return response()->error('Aucun événement correspondant à cet id n\'a été trouvé.', 404);
    }
    
    /**
     * Methode permettant de supprimer l'invitation a participer a un evenement
     * route : events/:id/invitation
     * methode : DELETE
     */
    public function deleteInvitation(Request $request, $id) {
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
