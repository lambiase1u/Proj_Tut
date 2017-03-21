<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $table = 'event';
    //public $incrementing = false;
    public $timestamps = true;

    protected $fillable = [
        'idParent','title', 'description', 'public', 'capacity', 'date','idCategorie','placeId'
    ];


    // je suis pas sur de celle la
    public function  organizer(){
        return $this->hasMany('App\Organizer');
    }
    /*
    public function comments()
    {
        return $this->hasMany('App\Comment');
    }
    */
}
