<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

use App\Http\Requests;
use Webpatser\Uuid\Uuid;

use App\Category;
use App\Event;

/**
 * Controleur des categories d'evenement
 */
class CategoryController extends Controller
{
    /**
     * Methode permettant de recuperer la liste des categories
     * route : /api/categories
     * methode : GET
     */
    public function findAll(Request $request)
    {
        $categories = Category::all();
        
        if(count($categories) != 0)
            return response()->json($categories);
        else
            return response()->error('Aucune catégorie n\'a été trouvée.', 204);
    }
    
    /**
     * Methode permettant de recuperer une categorie a partir de son id
     * reoute : /api/categories/{id}
     * methode : GET
     */
    public function findById(Request $request, $id) {
        $categorie = Category::find($id);
        
        if($categorie != null)
            return response()->json($categorie);
        else 
            return response()->error('Aucune catégorie correspondant à l\'identifiant n\'a été trouvée.', 404);
    }
    
    /**
     * Methode permettant de recuperer les evenements associes a une categorie
     * route : /api/categories/{id}/events
     * methode : GET
     */
     public function findEvents(Request $request, $id) {
        $categorie = Category::find($id);
        
        if($categorie == null)
            return response()->error('Aucune catégorie correspondant à l\'identifiant n\'a été trouvée.', 404);
        else {
            $events = $categorie->events;
            
            if(count($events) != 0) {
                //on recupere l'utilisateur afin de supprimer les evenements qui ne lui sont pas accessibles
                $user = User::findAuthorOfRequest();
                $eventsFiltered = array();
                foreach ($events as $event)
                    if($event->isAccessible($user))
                        array_push($eventsFiltered, $event);
                return response()->json($eventsFiltered);
            }
            else
                return response()->noContent('Aucun événement trouvé.');
        }
    }
    
    /**
     * Methode permettant de creer une categorie
     * route : /api/categories
     * methode : POST
     */
    public function create(Request $request) {
        $this->validate($request, [
            'title' => 'required|unique:category',
            'description' => 'required'
        ]);
        
        $category = new Category();
        $category->id = (string)Uuid::generate();
        $category->title = trim($request->title);
        $category->description = trim($request->description);
        
        $category->save();

        return response()->json($category, 201);
    }
    
    /**
     * Methode permettant de mettre a jour une categorie
     * route : /api/categories/{id}
     * methode : PUT
     */
    public function update(Request $request, $id) {
        $categorie = Category::find($id);
        
        if($categorie != null) {
            $this->validate($request, [
                'title' => 'required|unique:category',
                'description' => 'required'
            ]);
            
            $categorie->title = trim($request->title);
            $categorie->description = trim($request->description);
            $categorie->save();
            
            return response()->json($categorie);
        } else {
            return response()->error('Aucune catégorie correspondant à l\’identifiant n\'a été trouvée.', 404);
        }
    }
    
    /**
     * Methode permettant de supprimer une categorie
     * route : /api/categories/{id}
     * methode : DELETE
     */
    public function delete(Request $request, $id) {
        $categorie = Category::find($id);
        
        if($categorie != null) {
            $categorie->delete();
            
            return response()->success('La catégorie a bien été supprimée.');
        } else 
            return response()->error('Aucune catégorie correspondant à l\’identifiant n\'a été trouvée.', 404);
    }
}
