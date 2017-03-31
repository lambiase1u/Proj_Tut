<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Webpatser\Uuid\Uuid;
use Auth;
use JWTAuth;

use App\User;

/**
 * Controleur des utilisateurs de l'application
 */
class UserController extends Controller
{
    const APIKEY = 'AIzaSyAFosuj-n-qIEM_BRqt2JX-YIhfno9138k';

    /**
     * Methode permettant de recuperer la liste des utilisateurs
     * route : /api/users
     * methode : GET
     */
    public function findAll(Request $request)
    {
        $from = 0;
        $size = User::count();

        if (isset($request->from))
            $from = $request->from - 1;

        if (isset($request->to))
            $size = $request->to - $from;

        $users = User::take($size)->skip($from)->get();

        if (count($users) != 0)
            return response()->json($users);
        else
            return response()->error('Aucun utilisateur sélectionné.', 204);
    }

    /**
     * Methode permettant de recuperer une utilisateur a partir de son id
     * reoute : /api/users/{id}
     * methode : GET
     */
    public function findById(Request $request, $id)
    {
        $user = User::find($id);

        if ($user != null)
            return response()->json($user);
        else
            return response()->error('Aucun utilisateur correspondant à l\'identifiant n\'a été trouvée.', 404);
    }

    /**
     * Methode permettant de mettre a jour un utilisateur
     * route : /api/users/{id}
     * methode : PUT
     */
    public function update(Request $request, $id)
    {
        //A faire
    }

    /**
     * Methode permettant de supprimer un utilisateur
     * route : /api/users/{id}
     * methode : DELETE
     */
    public function delete(Request $request)
    {
        //A faire
    }

    /**
     * Methode permettant de récuperer l'utilisateur courant
     * route : /api/users/self
     * methode : GET
     */
    public function findMe()
    {
        $user = null;

        try {
            $user = JWTAuth::parseToken()->authenticate();
        } catch (TokenExpiredException $e) {
            return response()->error('Token has expired', 500);
        } catch (TokenInvalidException $e) {
            return response()->error('Token is invalid', 500);
        } catch (JWTException $e) {
            return response()->error('Token is missing', 500);
        }

        return response()->success(compact('user'));


    }

    public function invitations(Request $request, $idUser)
    {
        $user = User::find($idUser);
        if ($user != null) {
            $invitation = $user->eventsInvitations;
            return response()->json($invitation);
        } else {
            return response()->error('Aucun utilisateur correspondant à l\'identifiant n\'a été trouvée.', 404);
        }

    }

    public function participe(Request $request, $id, $nb_event)
    {
        $user = User::find($id);
        if ($user != null) {
            $event = $user->eventsParticipations->take($nb_event);
            $res = [];
            $json = null;

            foreach ($event as $val) {
                $nb_participant = $val->participants->count();

                //si je recupere les événements places ici la requete et longue.
                $json = json_decode(file_get_contents("https://maps.googleapis.com/maps/api/place/details/json?placeid=" . $val->placeId . "&key=" . self::APIKEY), true);
                $location = $json['result']['geometry']['location'];
                array_push($res, ['nbParticipant' => $nb_participant, $val, 'pos' => ['lat' => $location['lat'], 'long' => $location['lng']]]);
            }

            return response()->json($res);
        } else {
            return response()->error('Aucun utilisateur correspondant à l\'identifiant n\'a été trouvée.', 404);
        }
    }

}
