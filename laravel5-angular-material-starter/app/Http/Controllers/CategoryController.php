<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

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
            return response()->error('Aucune catégorie correspondant à l\'identifiant n\'a été trouvée.', 204);
    }
    
    /**
     * Methode permettant de recuperer les evenements associes a une categorie
     * route : /api/categories/{id}/events
     * methode : GET
     */
     public function findEvents(Request $request, $id) {
        $categorie = Category::find($id);
        
        if($categorie == null)
            return response()->error('Aucune catégorie correspondant à l\'identifiant n\'a été trouvée.', 204);
        else {
            $events = $categorie->events;
            
            if(count($events) != 0)
                return response()->json($events);
            else
                return response()->error('Aucun événement trouvé.', 204);
        }
    }
}
