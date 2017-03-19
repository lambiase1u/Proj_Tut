<?php

namespace App\Http\Controllers;

use App\Posts;
use Illuminate\Http\Request;

use App\Http\Requests;
use Webpatser\Uuid\Uuid;

class CreatePostController extends Controller
{
    public function create(Request $request)
    {
        $this->validate($request, [
            'name'  => 'required',
            'topic' => 'required',
        ]);

        $post = new Posts();
        $post->id = Uuid::generate();
        $post->name = $request->input('name');
        $post->topic = $request->input('topic');
        $post->save();

        return response()->success(compact('post'));
    }


    public function  getAll(){
        $posts = Posts::all();

        return response()
            ->success(compact('posts'));
    }
}
