<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * Classe representant une Categorie d'Evenement
 */
class Category extends Model
{
    /**
     * Nom de la table 
     */
    protected $table = 'category';
  
    /**
     * Cle primaire de la table
     */
	protected $primaryKey = 'id';
	public $timestamps = false;
    public $incrementing = false;

    /**
     * Evenements lies a la categorie
     */
	public function events() {
		return $this->hasMany('\App\Event', 'idCategorie');
	}
}
