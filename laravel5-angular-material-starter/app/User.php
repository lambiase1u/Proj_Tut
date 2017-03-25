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
		return $this->hasMany('\app\Comment', 'idUser');
	}
    
    /**
     * Evenements ou l'utilisateur est organisateur
     */
	public function eventsOrganization() {
		return $this->belongsToMany('\app\Event', 'organizer', 'idEvent', 'idEvent');
	}
    
    /**
     * Evenements ou l'utilisateur est invite
     */
	public function eventsInvitations() {
		return $this->belongsToMany('\app\Event', 'invitation', 'idUser', 'idActivity');
	}
    
    /**
     * Evenements auxuqles l'utilisateur participe
     */
	public function eventsParticipations() {
		return $this->belongsToMany('\app\User', 'participation', 'idUser', 'idActivity');
	}

    /**
     * Methode statique qui recupere l'user qui fait la requete si il est connecte
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
        $found = false;
        $organizers = $event->organizers;
        foreach ($organizers as $organizer){
            if($organizer->id == $this->id){
                $found = true;
                break;
            }
        }
        return $found;
    }

    public function isInvited($event){
        $found = false;
        $invitations = $event->invitations;
        foreach ($invitations as $invitation){
            if($invitation->id == $this->id){
                $found = true;
                break;
            }
        }
        return $found;
    }

}
