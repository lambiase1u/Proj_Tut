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
    const API_KEY_WEATHER = "ARsDFFIsBCZRfFtsD3lSe1Q8ADUPeVRzBHgFZgtuAH1UMQNgUTNcPlU5VClSfVZkUn8AYVxmVW0Eb1I2WylSLgFgA25SNwRuUT1bPw83UnlUeAB9DzFUcwR4BWMLYwBhVCkDb1EzXCBVOFQoUmNWZlJnAH9cfFVsBGRSPVs1UjEBZwNkUjIEYVE6WyYPIFJjVGUAZg9mVD4EbwVhCzMAMFQzA2JRMlw5VThUKFJiVmtSZQBpXGtVbwRlUjVbKVIuARsDFFIsBCZRfFtsD3lSe1QyAD4PZA%3D%3D&_c=19f3aa7d766b6ba91191c8be71dd1ab2";
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
     * Methode permettant d'obtenir des donnees meteorologiques a partir d'infoclimat
     * route : places/:id/weather
     * methode : GET
     */
    public function getWeather(Request $request, $id) {
        $details = json_decode(file_get_contents('https://maps.googleapis.com/maps/api/place/details/json?key='.self::API_KEY_PLACES.'&placeid='.$id), true);  
        
        $location = $details['result']['geometry']['location'];
        
        $weather = file_get_contents("http://www.infoclimat.fr/public-api/gfs/json?_ll=".$location["lat"].",".$location["lng"]."&_auth=".self::API_KEY_WEATHER);
        
        return response()->json($weather, 200);
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
                $location = $this->getDefaultLocation();
            }

            return $location;
        } else return false;

    }

    /**
     * Methode permettant de recuperer la position de l'utilisateur effectuant la requete
     * Methode : GET
     * route : /location
     */
    public function getLocation(){
        $location = $this->getUserLocation();
        if($location == false){
            $location = $this->getDefaultLocation();
        }
        return response()->success(compact('location'));
    }

    /**
     * Methode prive permettant de recuperer une position par defaut
     */
    private function getDefaultLocation(){
        return array('lat' => 48.682788, 'lng' => 6.160994);
    }
}
