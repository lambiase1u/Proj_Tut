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
	public $timestamps = false;

    /**
     * Evenements parent
     */
	public function parentEvent() {
		return $this->hasMany('\app\Event', 'idParent');
	}
  
    /**
     * Commentaires de l'evenement
     */
    public function comments() {
        return $this->hasMany('\app\Comment', 'idEvent');
    }
    
    /**
     * Categorie de l'Evenement
     */
    public function category() {
        return $this->belongsTo('\app\Category', 'idCategorie');
    }
    
    /**
     * Organisateurs de l'Evenement
     */
	public function organizers() {
		return $this->belongsToMany('\app\User', 'organizer', 'idEvent', 'idUser');
	}
    
    /**
     * Participants a l'Evenement
     */
	public function participants() {
		return $this->belongsToMany('\app\User', 'participation', 'idActivity', 'idUser');
	}
    
    /**
     * Invites a l'Evenement
     */
	public function invitations() {
		return $this->belongsToMany('\app\User', 'invitation', 'idActivity', 'idUser');
	}
}
