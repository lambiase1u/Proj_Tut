<?php
/**
 * Created by PhpStorm.
 * User: Dylan
 * Date: 25/03/2017
 * Time: 16:55
 */

namespace App;

use Illuminate\Database\Eloquent\Model;

class Organizer extends Model
{
    /**
     * Nom de la table
     */
    protected $table = 'organizer';
    public $timestamps = false;
    public $incrementing = false;
}