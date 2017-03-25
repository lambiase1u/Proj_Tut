<?php

namespace App\Providers;

use Response;
use Illuminate\Support\ServiceProvider;

use Webpatser\Uuid\Uuid;

class ResponseMacroServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        Response::macro('success', function ($data) {
            return Response::json([
                'errors'  => false,
                 'data' => $data,
                ]);
        });

        Response::macro('created', function($data) {
            return Response::json([
                'errors' => false,
                'data' => $data,
            ], 201);
        });

        Response::macro('noContent', function($message) {
            return Response::json([
                'errors' => false,
                'message' => $message,
            ], 204);
        });

        Response::macro('unauthorized', function ($message = "Vous n'avez pas les droits nécessaire pour effectuer cette opération") {
            return Response::json([
                'errors'          => [
                    'message' => $message,
                ],
                'status_code'     => "401",
            ], 401);
        });

        Response::macro('error', function ($message, $status = 400) {
            return Response::json([
            'message'         => $status.' error',
            'errors'          => [
            'message'         => $message,
            ],
            'status_code'     => $status,
            ], $status);
        });
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
