/**
 * Service permettant d'utiliser simplement les differentes routes liees aux evenements de l'API
 */
export class EventService {
    /**
     * Constructeur du service
     */
    constructor(API) {
        'ngInject';

        this.API = API
    }
    
    /**
     * Methode permettant de recuperer la liste de toutes les evenements
     */
    findAll() {
        return this.API.all('events').get('');
    }
    
    /**
     * Methode permettant de recuperer un evenement a partir de son id
     * @param data : tableau des donnes utiles [id: id de l'evenement]
     */
    findOne(data) {
        if(data.id !== undefined)
            return this.API.one('events', data.id).get('');
        else
            return false;
    }
    
    /**
     * Methode permettant de creer un evenement avec les donnees necessaires
     * @param data : tableau des donnees utiles :
     *  [
     *      title, 
            description, 
            public, 
            capacity, 
            dateDebut, 
            dateFin, 
            placeId, 
            idCategorie  
     *  ]
     */
    create(data) {
        return this.API.all('events').post(data);   
    }
    
    /**
     * Methode permettant de supprimer un evenement
     * @param data : tableau des données utiles [id: id de l'evenement]
     */
    delete(data) {
        return this.API.one('events', data.id).remove();
    }
    
    /**
     * Methode permettant de mettre a jour un evenement
     * @param data : tableau des donnees utiles :
     *  [
     *      id,
            title, 
            description, 
            public, 
            capacity, 
            dateDebut, 
            dateFin, 
            placeId, 
            idCategorie  
     *  ]
     */
    update(data) {
        return this.API.one('events', data.id).put(data); 
    }
    
    /**
     * Methode permettant de recuperer la liste des organisateurs de l'evenement
     * @param data : tableau des donnees utiles : [id: id de l'evenement]
     */
    getOrganizers(data) {
        if(data.id !== undefined)
            return this.API.one('events', data.id).all('organizers').get('');
        else
            return false;
    }
    
    /**
     * Methode permettant d'ajouter un organisateur a l'evenement
     * @param data : tableau des donnees utiles : [id: id de l'evenement, idUser: id de l'utilisateur]
     */
    addOrganizer(data) {
        if(data.id !== undefined && data.idUser !== undefined)
            return this.API.one('events', data.id).all('organizers').post(data);
        else
            return false;
    }
    
    /**
     * Methode permettant de supprimer un organisateur d'un evenement
     * @param data : tableau des donnees utiles : [id: id de l'evenement, idUser : id de l'utilisateur]
     */
    deleteOrganizer(data) {
        if(data.id !== undefined && data.idUser !== undefined)
            return this.API.one('events', data.id).one('organizers', data.idUser).remove();
        else
            return false;
    }
    
    /**
     * Methode permettant de recuperer la liste des participants a un evenement
     * @param data : tableau des donnees utiles : [id: id de l'evenement]
     */
    getParticipants(data) {
        if(data.id !== undefined)
            return this.API.one('events', data.id).all('participants').get('');
        else
            return false;
    }
    
    /**
     * Methode permettant d'ajouter un participant a un evenement
     * @param data : tableau des donnees utiles : [id: id de l'evenement]
     */
    addParticipant(data) {
        if(data.id !== undefined)
            return this.API.one('events', data.id).all('participate').post();
        else
            return false;
    }
    
    /**
     * Methode permettant de supprimer un participant a un evenement
     * @param data : tableau des donnees utiles : [id: id de l'evenement]
     */
    deleteParticipant(data) {
        if(data.id !== undefined)
            return this.API.one('events', data.id).all('participate').remove();
        else
            return false;
    }
    
    /**
     * Methode permettant de recuperer la liste des invitations a un evenement
     * @param data : tableau des donnees utiles : [id: id de l'evenement]
     */
    getInvitations(data) {
        if(data.id !== undefined)
            return this.API.one('events', data.id).all('invitations').get('');
        else
            return false;
    }
    
    /**
     * Methode permettant d'ajouter une invitation a un evenement
     * @param data : tableau des donnees utiles : [id: id de l'evenement, idUser: id de l'utilisateur a inviter]
     */
    addInvitation(data) {
        if(data.id !== undefined && data.idUser !== undefined)
            return this.API.one('events', data.id).all('invitations').post(data);
        else
            return false;
    }
    
    /**
     * Methode permettant de supprimer une invitation a un evenement
     * @param data : tableau des donnees utiles : [id: id de l'evenement, idUser: id de l'utilisateur a inviter]
     */
    deleteInvitation(data) {
        if(data.id !== undefined && data.idUser !== undefined)
            return this.API.one('events', data.id).all('invitations').remove(data);
        else
            return false;
    }
}

