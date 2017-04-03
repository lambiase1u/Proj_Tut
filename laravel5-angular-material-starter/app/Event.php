<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * Classe representant un Evenement
 */
class Event extends Model
{
    /**
     * Nom de la table 
     */
    protected $table = 'Event';
  
    /**
     * Cle primaire de la table
     */
	protected $primaryKey = 'id';
    public $incrementing = false;
	public $timestamps = true;

    protected $hidden = [
        'invitations', 'organizers', 'participants'
    ];

    /**
     * Evenements parent
     */
	public function parentEvent() {
		return $this->hasMany('\App\Event', 'idParent');
	}
    
    /**
     * Evenement enfant
     */
    public function childEvent() {
        return $this->belongsTo('\App\Event', 'idParent');
    }
  
    /**
     * Commentaires de l'evenement
     */
    public function comments() {
        return $this->hasMany('\App\Comment', 'idEvent');
    }
    
    /**
     * Categorie de l'Evenement
     */
    public function category() {
        return $this->belongsTo('\App\Category', 'idCategorie');
    }
    
    /**
     * Organisateurs de l'Evenement
     */
	public function organizers() {
		return $this->belongsToMany('\App\User', 'organizer', 'idEvent', 'idUser');
	}
    
    /**
     * Participants a l'Evenement
     */
	public function participants() {
		return $this->belongsToMany('\App\User', 'participation', 'idActivity', 'idUser');
	}
    
    /**
     * Invites a l'Evenement
     */
	public function invitations() {
		return $this->belongsToMany('\App\User', 'invitation', 'idActivity', 'idUser');
	}

    /**
     * Methode permettant de dire si l'utilisateur a acces a l'evenement
     * @param $event evenement a tester
     * @param $user utilisateur a tester
     * @return bool egal a true si l'utilisateur a le droit d'acceder a l'evneement
     */
    public function isAccessible($user=null){
        $res = true;

        if(!$this->public) {
            if($user ==null)
                $user = User::findAuthorOfRequest();
            if (!$user)
                $res = false;
            else {
                if(!$user->isOrganizerOrInvited($this))
                    $res = false;
            }
        }
        return $res;
    }


    public function delete()
    {
        $this->organizers()->detach();
        $this->participants()->detach();
        $this->invitations()->detach();
        $this->comments()->delete();

        return parent::delete();
    }
}
