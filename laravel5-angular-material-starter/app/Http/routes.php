<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::group(['middleware' => ['web']], function () {
    Route::get('/', 'AngularController@serveApp');

    Route::get('/unsupported-browser', 'AngularController@unsupported');
});




//public API routes
$api->group(['middleware' => ['api']], function ($api) {

    // Authentication Routes...
    $api->post('auth/login', 'Auth\AuthController@login');
    $api->post('auth/register', 'Auth\AuthController@register');
    $api->get('auth/self', 'Auth\AuthController@findMe');


    // Password Reset Routes...
    $api->post('auth/password/email', 'Auth\PasswordResetController@sendResetLinkEmail');
    $api->get('auth/password/verify', 'Auth\PasswordResetController@verify');
    $api->post('auth/password/reset', 'Auth\PasswordResetController@reset');
  
    //----------------------------------------------------------------------------------//
    //---------------------------------OpenEvent Routes---------------------------------//
    //----------------------------------------------------------------------------------//

    //Events routes
    $api->get('events/{id}', 'EventController@findById');
    $api->get('events/', 'EventController@findAll');

    //Comments routes
    $api->get('events/{id}/comments', 'EventController@findAllComments');
    $api->get('events/{id}/comments/{idComment}', 'EventController@findCommentById');

    //Organizers routes
    $api->get('events/{id}/organizers', 'OrganizerController@findAll');

    //Users routes
    $api->get('users/', 'UserController@findAll');
    $api->get('users/{id}', 'UserController@findById');


    //Categories routes
    $api->get('categories/', 'CategoryController@findAll');
    $api->get('categories/{id}', 'CategoryController@findById');
    $api->get('categories/{id}/events', 'CategoryController@findEvents');

});

//protected API routes with JWT (must be logged in)
$api->group(['middleware' => ['api', 'api.auth']], function ($api) {
    //----------------------------------------------------------------------------------//
    //---------------------------------OpenEvent Routes---------------------------------//
    //----------------------------------------------------------------------------------//

    //Events routes
    $api->post('events', 'EventController@create');
    $api->put('events/{id}', 'EventController@update');
    $api->delete('events/{id}', 'EventController@delete');

    //Participations routes
    $api->post('events/{id}/participate', 'EventController@participate');
    $api->delete('events/{id}/participate', 'EventController@removeParticipation');

    //Invitations routes
    $api->post('events/{id}/invitation', 'EventController@invitation');
    $api->delete('events/{id}/invitation', 'EventController@deleteInvitation');

    //Comments routes
    $api->post('events/{id}/comments', 'EventController@addComment');
    $api->put('events/{id}/comments', 'EventController@updateComment');
    $api->delete('events/{id}/comments', 'EventController@removeComment');

    //Organizer routes
    $api->post('events/{id}/organizers', 'OrganizerController@create');
    $api->delete('events/{id}/organizers', 'OrganizerController@delete');

    //Users routes
    $api->put('users/{id}', 'UserController@update');
    $api->delete('users/{id}', 'UserController@delete');

    //Categories routes
    $api->post('categories/', 'CategoryController@create');
    $api->put('categories/{id}', 'CategoryController@update');
    $api->delete('categories/{id}', 'CategoryController@delete');
});
