<?php

namespace App\Http\Controllers;

use App\Event;
use Illuminate\Http\Request;

use App\Http\Requests;
use Webpatser\Uuid\Uuid;

class EventController extends Controller
{
    /**
     * Fonction de creation d'un evenement
     * @param Request $request
     * @return reponse contenant l'evenement si celui-ci a ete cree.
     */
    public function create(Request $request)
    {

        $date_Time = new \DateTime();
        $current_date = $date_Time->createFromFormat('Y-m-d H:i:s', date('Y-m-d H:i:s'));

        $this->validate($request, [
            'title' => 'required | min: 3',
            'description' => 'required | min: 15',
            'public' => 'required | boolean',
            'capacity' => 'required | integer',
            'date' => 'required | date '
            //'idCategorie' => 'required | string',
            //'placeId' => 'required'
        ]);

            $event = new Event();
            $event->id = (string)Uuid::generate();
            $event->title = trim($request->input('title'));
            $event->description = trim($request->input('description'));
            $event->public = $request->input('public');
            $event->capacity = $request->input('capacity');
            $event->date = $request->input('date');
            //$event->idCategorie = $request->input('idCategorie');
            //$event->placeId = $request->input('placeId');

            if($event->save())
                return response()->created(compact('event'));
            else
                return response()->error("La création a échouée", 500);
    }

    /**
     * Methode permettant de recuperer les liste de tous les evenements
     * @return reponse contenant la liste des evenements si il y en a
     */
    public function findAll(){
        $events = Event::all();

        if($events->count() == 0)
            return response("Aucun contenu", 204)
                ->header('Content-Type', 'application/json');
        else
            return response()->success(compact('events'));
    }

    /**
     * Methode permettant de recuperer un evenement grace a son id
     * @param $id id de l'evenement a recuperer
     * @return reponse contenant l'evenement si il est trouve, ou une erreur 404 sinon.
     */
    public function findById($id){
        $event = Event::find($id);
        if($event != null)
            return response()->success(compact('event'));
        else
            return response()->error("Evenement non trouvé", 404);
    }

    /**
     * Methode permettant de supprimer un evenement via son id
     * @param $id id de l'evenement a supprimmer
     */
    public function delete($id){
        $event = Event::find($id);
        if($event != null)
            $event->delete();
        return response()->success("Evenement supprimé.");
    }

    /**
     * Methode permettant de modifier ou ajouter un event
     * @param Request $request
     * @param $id id de l'event a modifier
     * @return mixed reponse contenant l'evenement modifie ou cree
     */
    public function update(Request $request, $id){
        $date_Time = new \DateTime();
        $current_date = $date_Time->createFromFormat('Y-m-d H:i:s', date('Y-m-d H:i:s'));

        $this->validate($request, [
            'title' => 'required | min: 3',
            'description' => 'required | min: 15',
            'public' => 'required | boolean',
            'capacity' => 'required | integer',
            'date' => 'required | date '
            //'idCategorie' => 'required | string',
            //'placeId' => 'required'
        ]);

        $event = Event::find($id);
        $created = false;

        if($event == null){
            $created = true;
            $event = new Event();
            $event->id = (string)Uuid::generate();
        }

        $event->title = trim($request->input('title'));
        $event->description = trim($request->input('description'));
        $event->public = $request->input('public');
        $event->capacity = $request->input('capacity');
        $event->date = $request->input('date');
        //$event->idCategorie = $request->input('idCategorie');
        //$event->placeId = $request->input('placeId');

        if($event->save()){
            if($created)
                return response()->created(compact('event'));
            else
                return response()->success(compact('event'));
        } else
            return response()->error("La modification a échouée", 500);

    }
}
