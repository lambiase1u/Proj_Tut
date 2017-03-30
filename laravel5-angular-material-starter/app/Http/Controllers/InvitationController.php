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

/**
 * Controleur des Invitations aux Evenements
 */
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

        if($event != null) {
            if($event->public || $user->isOrganizer($event)) {
                $this->validate($request, [
                    'idUser' => 'required'
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
            else
                return response()->error('Vous n\'avez pas le droit d\'inviter des gens à cet événement.', 401);
        } else
            return response()->error('Aucun événement correspondant à cet id n\'a été trouvé.', 404);
    }

    /**
     * Methode permettant de lister les inviations a participer a un evenement
     * route : events/:id/invitations
     */
    public function findAllByEvent($id){
        $event = Event::find($id);
        if($event == null)
            return response()->noContent("Aucun evenement correspondant a l'identifiant n'a été trouvé");

        //verification de l'accessibilité a l'evenement
        if(!$event->isAccessible())
            return response()->error("L'événement est privé", 401);

        $invitations = $event->invitations;
        if($invitations->count() == 0)
            return response()->noContent("Il n'y a aucune invitations sur cet événement.");
        else
            return response()->success(compact('invitations'));
    }

    /**
     * Methode permettant de supprimer l'invitation a participer a un evenement
     * route : events/:id/invitation
     * methode : DELETE
     */
    public function deleteInvitation(Request $request, $id) {
        $event = Event::find($id);
        $user = Auth::user();

        $this->validate($request, [
            'idUser' => 'required'
        ]);

        $utilisateurInvite = User::find($request->idUser);

        if($utilisateurInvite != null) {
            $invitation = DB::table('invitation')->where('idUser', '=', $utilisateurInvite->id)->where('idActivity', '=', $event->id);
            $invitationRow = $invitation->first();

            if($invitationRow != null) {
                if(!$invitationRow->answered) {
                    $invitation->delete();

                    return response()->success('La participation a bien été supprimée.');
                } else
                    return response()->error('L\'utilisateur a déjà répondu à l\'invitation.', 400);
            } else
                return response()->error('L\'invitation n\'a pas été trouvée.', 404);
        } else {
            return response()->error('L\'utilisateur dont vous souhaitez retirer l\'invitation n\'a pas été trouvé.', 404);
        }
    }
}
