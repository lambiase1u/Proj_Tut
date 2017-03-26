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

    //Comments routes
    $api->get('events/{id}/comments', 'EventController@findAllComments');

    $api->get('comments/{idComment}', 'CommentsController@findCommentById');

    //Organizers routes
    $api->get('events/{id}/organizers', 'EventController@findAllOrganizers');

    //Invitations routes
    $api->get('events/{id}/invitations', 'EventController@findAllInvitations');

    //Users routes
    $api->get('users/', 'UserController@findAll');
    $api->get('users/{id}', 'UserController@findById')->where('id', '(\w{8}(-\w{4}){3}-\w{12}?)');

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
    $api->post('events/{id}/participate', 'ParticipationController@participate');
    $api->delete('events/{id}/participate', 'ParticipationController@removeParticipation');

    //Invitations routes
    $api->post('events/{id}/invitation', 'InvitationController@invitation');
    $api->delete('events/{id}/invitation', 'InvitationController@deleteInvitation');

    //Comments routes
    $api->post('events/{id}/comments', 'CommentsController@addComment');
    $api->put('comments/{id}', 'CommentsController@updateComment');
    $api->delete('comments/{id}', 'CommentsController@removeComment');

    //Organizer routes
    $api->post('events/{id}/organizers', 'OrganizerController@create');
    $api->delete('events/{id}/organizers', 'OrganizerController@delete');

    //Users routes
    $api->put('users/{id}', 'UserController@update')->where('id', '(\w{8}(-\w{4}){3}-\w{12}?)');
    $api->delete('users/{id}', 'UserController@delete')->where('id', '(\w{8}(-\w{4}){3}-\w{12}?)');
    $api->get('users/self', 'UserController@findMe');

    //Categories routes
    $api->post('categories/', 'CategoryController@create');
    $api->put('categories/{id}', 'CategoryController@update');
    $api->delete('categories/{id}', 'CategoryController@delete');
});
