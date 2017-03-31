<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

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

        if(isset($request->from))
            $from = $request->from - 1;

        if(isset($request->to))
           
        $size = $request->to - $from;

        $users = User::take($size)->skip($from)->get();

        if(count($users) != 0)
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

        if($user != null)
            return response()->json($user);
        else
            return response()->error('Aucun utilisateur correspondant à l\'identifiant n\'a été trouvée.', 404);
    }

    /**
     * Methode permettant de mettre a jour un utilisateur
     * route : /api/users/{id}
     * methode : PUT
     */

    public function update(Request $request, $id) {
        $currentUser = Auth::user();
        $requestUser = User::find($id);
        $new = false;
        $validateEmail = 'required|email';
        if($requestUser == null){
            $requestUser = new User();
            $requestUser->id = Uuid::generate();
            $validateEmail.= '|unique:users';
            $new = true;
        } else {
            if ($requestUser != $currentUser)
                return response()->error("Vous n'êtes pas autorisé à modifier cet utilisateur", 401);
        }
        $date_Time = new \DateTime();
        $current_date = $date_Time->createFromFormat('Y-m-d H:i:s', date('Y-m-d H:i:s'));
        $adult = ($current_date->format('Y') - 18) . '-' . $current_date->format('m') . '-' . $current_date->format('d');

        $this->validate($request, [
            'name' => 'required|min:3',
            'firstName' => 'required|min:3',
            'email' => $validateEmail,
            'password' => 'required|min:8',
            'birthdate' => 'required|date|before:'.$adult
        ]);

        $requestUser->name = trim($request->name);
        $requestUser->firstName = trim($request->firstName);
        $requestUser->email = trim(strtolower($request->email));
        $requestUser->password = bcrypt($request->password);
        $requestUser->birthdate = trim($request->birthdate);

        $requestUser->save();

        if($new) {
            $token = JWTAuth::fromUser($requestUser);
            return response()->created(compact('requestUser', 'token'));
        } else
            return response()->success(compact('requestUser'));
    }

    /**
     * Methode permettant de supprimer un utilisateur
     * route : /api/users/{id}
     * methode : DELETE
     */

    public function delete(Request $request, $id) {
        $user = Auth::user();

        if($user==null || $user->id!= $id)
            return response()->error("Vous ne pouvez pas effectuer cette action", 401);

        $user->delete();
        return response()->noContent();
    }

    /**
     * Methode permettant de récuperer l'utilisateur courant
     * route : /api/users/self
     * methode : GET
     */

    public function findMe(){
        $user = Auth::user();

        if($user == null)
            return response()->error("Vous n'êtes pas connecté." , 401);
        else
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
