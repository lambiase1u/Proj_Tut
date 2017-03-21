<?php

namespace App\Http\Controllers;

use App\Event;
use Illuminate\Http\Request;

use App\Http\Requests;
use Webpatser\Uuid\Uuid;

class EventController extends Controller
{
    public function create(Request $request)
    {

        $date_Time = new \DateTime();
        $current_date = $date_Time->createFromFormat('Y-m-d H:i:s', date('Y-m-d H:i:s'));
        /*
                Validato::extend('after_or_equal', function($attribute, $value, $parameters, $validator) {
                    return strtotime($validator->getData()[$parameters[0]]) <= strtotime($value);
                });

        | after_or_equal:' . $current_date
        */
        $this->validate($request, [
            'title' => 'required | min: 3',
            'description' => 'required | min: 15',
            'public' => 'required | boolean',
            'capacity' => 'required | integer',
            'date' => 'required | date ',
            //'idCategorie' => 'required | string',
            //'placeId' => 'required'
        ]);

        $event = new Event();
        $event->id = Uuid::generate();
        $event->title = trim($request->input('title'));
        $event->description = trim($request->input('description'));
        $event->public = $request->input('public');
        $event->capacity = $request->input('capacity');
        $event->date = $request->input('date');
       // $event->idCategorie = $request->input('idCategorie');
        //$event->placeId = $request->input('placeId');

        $event->save();
    }
}
