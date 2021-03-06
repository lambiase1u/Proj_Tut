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
    $api->get('events/{id}/place', 'EventController@findPlace');

    //Comments routes
    $api->get('events/{id}/comments', 'CommentsController@findAllByEvent');
    $api->get('comments/{idComment}', 'CommentsController@findCommentById');

    //Organizers routes
    $api->get('events/{id}/organizers', 'OrganizerController@findAll');
    $api->get('users/{id}/organizations', 'OrganizerController@findByUser')->where('id', '(\w{8}(-\w{4}){3}-\w{12}?)|self');

    //Invitations routes
    $api->get('events/{id}/invitations', 'InvitationController@findAllByEvent');
    
    //Participants routes
    $api->get('events/{id}/participants', 'ParticipationController@findAll');

    //Participations routes
    $api->get('users/{id}/participations', 'ParticipationController@findByUser')->where('id', '(\w{8}(-\w{4}){3}-\w{12}?)|self');

    // recuperer les participants d'un événements
    $api->get('events/{id}/participants', 'ParticipationController@findAll')->where('id', '(\w{8}(-\w{4}){3}-\w{12}?)');

    //Users routes
    $api->get('users/', 'UserController@findAll');
    $api->get('users/{id}', 'UserController@findById')->where('id', '(\w{8}(-\w{4}){3}-\w{12}?)');
    $api->get('users/{id}/participate', 'UserController@participe')->where('id', '(\w{8}(-\w{4}){3}-\w{12}?)');
    $api->get('users/{id}/invitation', 'UserController@invitations')->where('id', '(\w{8}(-\w{4}){3}-\w{12}?)');
    $api->get('users/{id}/events', 'UserController@findAll_event')->where('id', '(\w{8}(-\w{4}){3}-\w{12}?)');
    $api->get('users/{id}/calendar', 'UserController@getICalendar');

    //Categories routes
    $api->get('categories/', 'CategoryController@findAll');
    $api->get('categories/{id}', 'CategoryController@findById');
    $api->get('categories/{id}/events', 'CategoryController@findEvents');

    //recuperer la categorie d'un evenement
    $api->get('events/{id}/category', 'EventController@findCategory');
    
    //GooglePlaces routes
    $api->get('places/{id}', 'PlaceController@findById');
    $api->get('places/{id}/directions', 'PlaceController@getDirections');
    $api->get('places/{id}/weather', 'PlaceController@getWeather');
    $api->get('location/', 'PlaceController@getLocation');
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
    $api->post('events/{id}/participate', 'ParticipationController@participate');
    $api->delete('events/{id}/participate', 'ParticipationController@removeParticipation');


    //Invitations routes
    $api->post('events/{id}/invitations', 'InvitationController@invitation');
    $api->delete('events/{id}/invitations', 'InvitationController@deleteInvitation');

    //Comments routes
    $api->post('events/{id}/comments', 'CommentsController@addComment');
    $api->put('comments/{id}', 'CommentsController@updateComment');
    $api->delete('comments/{id}', 'CommentsController@removeComment');

    //Organizer routes
    $api->post('events/{id}/organizers', 'OrganizerController@create');
    $api->delete('events/{idEvent}/organizers/{idUser}', 'OrganizerController@delete');

    //Users routes
    $api->put('users/{id}', 'UserController@update')->where('id', '(\w{8}(-\w{4}){3}-\w{12}?)');
    $api->delete('users/{id}', 'UserController@delete')->where('id', '(\w{8}(-\w{4}){3}-\w{12}?)');
    $api->get('users/self', 'UserController@findMe');

    //Categories routes
    $api->post('categories/', 'CategoryController@create');
    $api->put('categories/{id}', 'CategoryController@update');
    $api->delete('categories/{id}', 'CategoryController@delete');
});
