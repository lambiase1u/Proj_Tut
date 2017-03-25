<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Webpatser\Uuid\Uuid;
use Auth;

use App\Comment;
use App\Event;

/**
 * Controleur des commentaires sur un evenement
 */
class CommentsController extends Controller
{
    /**
     * Methode permettant de recuperer un commentaire a partir de son id
     * route : /comments/:id
     * methode : GET
     */
    public function findCommentById(Request $request, $id) {
        $comment = Comment::find($id);
        
        if($comment != null)
            return response()->json($comment, 201);
        else
            return response()->error('Aucun commentaire correspondant à l\'id fourni n\'a été trouvé.', 404);
    }
    
    /**
     * Methode permettant d'ajouter un commentaire'
     * route : /events/:id/comments
     * methode : POST
     */
    public function addComment(Request $request, $id) {
        $event = Event::find($id);
        
        if($event != null) {
            $this->validate($request, [
                'comment' => 'required',
            ]);
            
            $user = Auth::user();

            $comment = new Comment();
            $comment->id = (string)Uuid::generate();
            $comment->comment = $request->comment;
            $comment->idUser = $user->id;
            $comment->idEvent = $event->id;

            $comment->save();

            return response()->json($comment, 201);   
        } else
            return response()->error('Aucun événement correspond à l\'id trouvé.', 404);
    }
    
    /**
     * Methode permettant de mettre a jour un commentaire
     * route : /comments/:id
     * methode : PUT
     */
    public function updateComment(Request $request, $id) {
        $this->validate($request, [
            'comment' => 'required',
        ]);
        
        $comment = Comment::find($id);
        
        if($comment != null) {
            if($comment->idUser == Auth::user()->id) {
                $comment->comment = $request->comment;
                $comment->save();
                
                return response()->json($comment);
            } else 
                return response()->error('Vous ne disposez pas des droits sur ce commentaire.', 401);
        } else 
            return response()->error('Aucun commentaire correspondant à l\'id n\'a été trouvé.', 404);
    }
    
    /**
     * Methode permettant de supprimer un commentaire
     * route : /comments/:id
     * methode : DELETE
     */
    public function removeComment(Request $request, $id) {
        $this->validate($request, [
            'comment' => 'required'
        ]);
        
        $comment = Comment::find($id);
        
        if($comment != null) {
            if($comment->idUser == Auth::user()->id) {
                $comment->delete();
                
                return response()->success('Le commentaire a bien été supprimé.');
            } else 
                return response()->error('Vous ne disposez pas des droits sur ce commentaire.', 401);
        } else
            return response()->error('Aucun commentaire correspondant à l\'id n\'a été trouvé.', 404);
    }
}
