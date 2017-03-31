/**
 * Service permettant d'utiliser simplement les differentes routes liees aux categories
 * sur l'API
 */
export class CategoryService{
    /**
     * Constructeur du service
     */
    constructor(API){
        'ngInject';

        this.API = API;
    }
    
    /**
     * Methode permettant de recuperer toutes les categories d'evenement
     */
    findAll() {
        return this.API.all('categories').get('');   
    }
    
    /**
     * Methode permettant de recuperer une categorie d'evenement a partir de son id
     * @param data : tableau des donnees utiles [id: id de la categorie]
     */
    findOne(data) {
        if(data.id !== undefined)
                return this.API.one('categories', data.id).get('');
            else
                return false;   
    }
    
    /**
     * Methode permettant de recuperer les evenements associes a une categorie
     * @param data : tableau des donnees utiles [id: id de la categorie]
     */ 
    getEvents(data) {
        if(data.id !== undefined)
            return this.API.one('categories', data.id).all('events').get('');
        else
            return false;
    }
     
    /**
     * Methode permettant de creer une categorie d'evenement
     * @param data : tableau des donnees utiles :
     *  [
     *      title, 
            description, 
     *  ]
     */
    create(data) {
        return this.API.all('categories').post(data);   
    }
    
    /**
     * Methode permettant de supprimer une categorie
     * @param data : tableau des données utiles [id: id de la categorie]
     */
    delete(data) {
        return this.API.one('categories', data.id).remove();
    }
    
    /**
     * Methode permettant de mettre a jour une categorie
     * @param data : tableau des donnees utiles :
     *  [
     *      id,
            title, 
            description, 
     *  ]
     */
    update(data) {
        return this.API.one('categories', data.id).put(data); 
    }
}

