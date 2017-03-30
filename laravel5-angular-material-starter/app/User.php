<?php

namespace App;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use JWTAuth;

class User extends Authenticatable
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */

    public $incrementing = false;

    protected $fillable = [
        'name', 'email', 'password', 'firstName', 'birthdate'
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];
    
    /**
     * Commentaires sur des Evenements
     */
	public function comments() {
		return $this->hasMany('\App\Comment', 'idUser');
	}
    
    /**
     * Evenements ou l'utilisateur est organisateur
     */
	public function eventsOrganization() {
		return $this->belongsToMany('\App\Event', 'organizer', 'idUser', 'idEvent');
	}
    
    /**
     * Evenements ou l'utilisateur est invite
     */
	public function eventsInvitations() {
		return $this->belongsToMany('\App\Event', 'invitation', 'idUser', 'idActivity');
	}
    
    /**
     * Evenements auxuqles l'utilisateur participe
     */
	public function eventsParticipations() {
		return $this->belongsToMany('\App\Event', 'participation', 'idUser', 'idActivity');
	}

    /**
     * Methode statique qui recupere l'user qui fait la requete si il est connecte mais que la route
     * n'oblige en rien l'utilisateur d'être connecté
     * @return user ou null si aucun utilisateur n'est connecté
     */
    public static function findAuthorOfRequest(){
        $user = null;
        try {
            $user = JWTAuth::parseToken()->authenticate();
        }
        catch (TokenExpiredException $e) {}
        catch (TokenInvalidException $e) {}
        catch (JWTException $e) {}

        return $user;
    }

    /**
     * Méthode permettant de voir si un user est organisateur ou invite a un evenement
     * @param $event evenement a regarder
     * @param $user utilisateur a regarder
     * @return bool egal a true si l'utilisateur est organisateur ou invite a l'evenement
     */
    public function isOrganizerOrInvited($event){
        return $this->isOrganizer($event) || $this->isInvited($event);
    }

    public function isOrganizer($event){
        $organizer = Organizer::where('idEvent', '=', $event->id)->where('idUser', '=', $this->id)->first();
        return ($organizer != null);
    }

    public function isInvited($event){
        $invitation = Invitation::where('idActivity', '=', $event->id)->where('idUser', '=', $this->id)->first();
        return ($invitation != null);
    }


    /**
     * Surcharge de la methode de suppression permettant de supprimer en cascades les données relatives a l'utilisateur
     */
    public function delete()
    {
        //Recuperation des evenements ou l'utilisateur est le seul organisateur, et suppression de ceux-ci
        $eventsOrganises = $this->eventsOrganization;
        foreach ($eventsOrganises as $eventsOrganise){
            $organisateurs = $eventsOrganise->organizers;
            if($organisateurs->count() < 2) {
                $eventsOrganise->delete();
            }
        }

        $this->eventsOrganization()->detach();
        $this->eventsInvitations()->detach();
        $this->eventsParticipations()->detach();
        $this->comments()->delete();

        return parent::delete();
    }

}
