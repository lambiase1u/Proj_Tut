<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * Classe representant une invitation a un evenement
 */
class Invitation extends Model
{
    /**
     * Nom de la table 
     */
    protected $table = 'invitation';
	public $timestamps = false;

}
