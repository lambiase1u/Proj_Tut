/**
 * Composant utilise dans l'affichage detaille d'un evenement
 */
class EventContentController{
    /**
     * Injection des dependances necessaires dans le constructeur, ici, des acces API
     */
    constructor(EventService, UserService, CategoryService, $state, $sce){
        'ngInject';

        this.EventService = EventService;
        this.UserService = UserService;
        this.CategoryService = CategoryService;
        this.$state = $state;
        this.$sce = $sce;
        
        this.event = null;
        this.place = null;
        this.organizers = null;
        this.participants = null;
        this.category = null;
        this.comments = null;
        this.directions = null;
        
        this.visibleDirections = false;
    }
    
    /**
     * Methode permettant de recuperer l'evenement et de l'inclure au scope
     */
    getEvent(data) {        
        this.EventService.findOne(data).then(
            (responseSuccess) => {
                //La requete a fonctionne
                this.event = responseSuccess.data.event;
                
                var dataCategory = {
                    id: this.event.idCategorie
                }
                
                var dataPlace = {
                    id: this.event.placeId
                }
                
                this.getCategory(dataCategory);
                this.getPlace(dataPlace);
                this.getDirections(dataPlace);
            },
            (responseError) => {
                this.$state.go('app.landing');
            }
        );
    }
    
    /**
     * Methode permettant de recuperer les informations sur le point d'interet associe a un evenement
     */
    getPlace(data) {
        this.EventService.getPlace(data).then(
            (responseSuccess) => {
                //On a trouve le point d'interet google associe
                this.place = responseSuccess.result;
                console.log(responseSuccess.result);
            },
            (responseError) => {
                //On n'a pas trouve de point d'interet associe
                console.log('Erreur');
            }
        );   
    }
    
    /**
     * Methode permettant de recuperer les organisateurs d'un evenement
     */
    getOrganizers(data) {
        this.EventService.getOrganizers(data).then(
            (responseSuccess) => {
                //On a recupere les organisateurs
                this.organizers = responseSuccess.data.organizers;
            },
            (responseError) => {
                //On n'a pas trouve l'evenement associe
                console.log('Erreur');
            }
        );    
    }
    
    /**
     * Methode permettant de recuperer la categorie d'un evenement
     */
    getCategory(data) {
        this.CategoryService.findOne(data).then(
            (responseSuccess) => {
                //On a recupere la categorie
                this.category = responseSuccess;
            },
            (responseSuccess) => {
                //On n'a pas trouve la categorie
            }
        );  
    }
    
    getComments(data) {
        this.EventService.getComments(data).then(
            (responseSuccess) => {
               //On a trouve les commentaires
                if(responseSuccess !== undefined)
                    this.comments = responseSuccess.data.comments;
                else
                    this.comments = [];
            },
            (responseSuccess) => {
                //On n'a pas trouve les commentaires
            }
        );
    }
    
    /**
     * Methode permettant de recuperer les participants a un evenement
     */
    getParticipants(data) {
        this.EventService.getParticipants(data).then(
            (responseSuccess) => {
                //On a recupere les participants
                if(responseSuccess !== undefined)
                    this.participants = responseSuccess.data.participants;
                else
                    this.participants = [];
            },
            (responseError) => {
                //On n'a pas trouve l'evenement associe
                console.log('Erreur');
            }
        );  
    }
    
    /**
     * Methode permettant de recuperer l'itineraire vers un evenement
     */
    getDirections(data) {
        this.EventService.getDirections(data).then(
            (responseSuccess) => {
                //On a recupere l'itineraire
                console.log(responseSuccess.routes[0]);
                this.directions = responseSuccess.routes[0];
            },
            (responseError) => {
                //Erreur
                console.log(responseError);
            }
        )
    }
    
    /**
     * Methode permettant de calculer si l'utilisateur dispose d'assez de temps pour se rendre sur les lieux de l'evenement
     */
    enoughTime() {
        return false;
    }
    
    /**
     * Methode permettant a un utilisateur de participer a un evenement
     */
    participer() {
        
    }
    
    /**
     * Methode permettant a un utilisateur d'editer l'evenement s'il est organisateur
     */
    editerEvent() {
        
    }
    
    trustHtml(text) {
        return this.$sce.trustAsHtml(text);
    }

    /**
     * A l'initialisation du composant
     */
    $onInit(){
        var data = {
            id: this.$state.params.id
        }
        
        this.getEvent(data);
        this.getOrganizers(data);
        this.getParticipants(data);
        this.getComments(data);
    }
}

export const EventContentComponent = {
    templateUrl: './views/app/components/eventContent/eventContent.component.html',
    controller: EventContentController,
    controllerAs: 'vm',
    bindings: {}
}
