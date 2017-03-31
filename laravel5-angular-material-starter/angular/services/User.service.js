/**
 * Service permettant d'utiliser simplement les differentes routes liees aux utilisateurs de l'API
 */
export class UserService {
    /**
     * Constructeur du service
     */
    constructor(API) {
        'ngInject';

        this.API = API;
    }
    
    /**
     * Methode permettant de recuperer la liste de toutes les utilisateurs
     */
    findAll() {
        return this.API.all('users').get('');  
    }
    
    /**
     * Methode permettant de recuperer un utilisateur
     * @param data : tableau des parametres utiles [id: id de l'utilisateur]
     */
    findOne(data) {
        if(data.id !== undefined)
            return this.API.one('users', data.id).get('');
        else
            return false;
    }
    
    /**
     * Methode permettant de recuperer l'utilisateur authentifie
     */
    findMe() {
        return this.API.all('users').all('self').get('');    
    }
    
    /**
     * Methode permettant de mettre a jour un utilisateur
     * @param data : tableau des parametres utiles 
        [
            "id" : identificateur de l'utilisateur
        	"name" : nom de famille de l'utilisateur
            "firstName" : prenom de l'utilisateur
            "birthdate" : date de naissance de l'utilisateur
            "email" : email de l'utilisateur
            "password" : mot de passe de l'utilisateur
        ]
     */
    udpdate(data) {
        if(data.id !== undefined)
            return this.API.one('users', data.id).put(data);
        else 
            return false;
    }
    
    /**
     * Methode permettant de supprimer un utilisateur
     * @param data : tableau des donnees utiles [id: id de l'utilisateur a supprimer]
     */
    delete(data) {
        if(data.id !== undefined)
            return this.API.one('users', data.id).remove();
        else
            return false;
    }
}

