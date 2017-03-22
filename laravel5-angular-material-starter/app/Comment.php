<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * Classe representant un Commentaire sur un Evenement
 */
class Comment extends Model
{
    /**
     * Nom de la table 
     */
    protected $table = 'comments';
  
    /**
     * Cle primaire de la table
     */
	protected $primaryKey = 'id';
	public $timestamps = false;
    public $incrementing = false;

    /**
     * Evenements lies a la categorie
     */
	public function event() {
		return $this->belongsTo('\App\Event', 'idEvent');
	}
  
    /**
     * Utilisateur auteur du commentaire
     */
    public function user() {
        return $this->belongsTo('\App\User', 'idUser');  
    }
}
