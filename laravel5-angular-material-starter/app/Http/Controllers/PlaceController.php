<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

/**
 * Controleur permettant de gerer les routes liees a l'API Google Places
 */
class PlaceController extends Controller
{
    const API_KEY_PLACES = "AIzaSyDslABjfZ39bDOU_f_BWjRdIbF7E8N5cOE";
    const API_KEY_DIRECTIONS = "AIzaSyCiruAPLeDG--hZLh10v5OjrBrwbz8VPoY";

    /**
     * Methode permettant d'obtenir une place
     * route : places/:id
     * methode : GET
     */
    public function findById(Request $request, $id) {
        $details = file_get_contents('https://maps.googleapis.com/maps/api/place/details/json?key='.self::API_KEY_PLACES.'&placeid='.$id);

        return response()->json($details, 200);
    }

    /**
     * Methode permettant de calculer l'itineraire depuis un point jusqu'au point d'interet Google
     * route : places/:id/directions
     * methode : GET
     */
    public function getDirections(Request $request, $id) {
        $origin = null;
      
        if(isset($request->placeId)) {
            //On utilise une position definie dans la requete
            $origin = $request->placeId;
        } else {
            //On utilise la position actuelle de l'utilisateur
            $location = $this->getUserLocation();
            $origin = $location['lat'].','.$location['lng'];
            //var_dump($location);
        }

        $travelTime = file_get_contents('https://maps.googleapis.com/maps/api/directions/json?key='.self::API_KEY_DIRECTIONS.'&origin='.$origin.'&destination=place_id:'.$id.'&language=fr');

        return response()->json($travelTime, 200);
    }

    /**
     * Methode retournant la position actuelle de l'utilisateur
     * @return location [lat, lng];
     */
    public function getUserLocation() {
        $userIp = $_SERVER['REMOTE_ADDR'];

        $data = file_get_contents("http://freegeoip.net/xml/".$userIp);

        if($data != false) {
            $xmlData = simplexml_load_string($data);

            $location = array();

            foreach($xmlData as $key => $value) {
                if($key == "Latitude")
                    $location['lat'] = (string)$value;

                if($key == "Longitude")
                    $location['lng'] = (string)$value;
            }

            if($location['lat'] == 0 || $location['lng'] == 0) {
                $location['lat'] = 48.682788;
                $location['lng'] = 6.160994;
            }

            return $location;
        } else return false;

    }
}
