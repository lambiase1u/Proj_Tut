<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Posts extends Model
{
    protected $table = 'posts';
    //public $incrementing = false;
    public $timestamps = true;

    protected $fillable = [
        'name', 'topic'
    ];
}
