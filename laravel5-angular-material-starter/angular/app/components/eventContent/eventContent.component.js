/**
 * Composant utilise dans l'affichage detaille d'un evenement
 */
class EventContentController{
    /**
     * Injection des dependances necessaires dans le constructeur, ici, des acces API
     */
    constructor(EventService, UserService, CategoryService, $state){
        'ngInject';

        this.EventService = EventService;
        this.UserService = UserService;
        this.CategoryService = CategoryService;
        this.$state = $state;
        
        this.event = null;
        this.place = null;
        this.organizers = null;
        this.participants = null;
    }
    
    /**
     * Methode permettant de recuperer l'evenement et de l'inclure au scope
     */
    getEvent() {
        let id = this.$state.params.id;
        
        var data = {
            id: this.$state.params.id
        }
        
        this.EventService.findOne(data).then(
            (responseSuccess) => {
                //La requete a fonctionne
                this.event = responseSuccess.data.event;
                this.getPlace(data);
                this.getOrganizers(data);
                this.getParticipants(data);
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
            },
            (responseError) => {
                //On n'a pas trouve de point d'interet associe
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
                this.organizers = responseSuccess.organizers;
            },
            (responseError) => {
                //On n'a pas trouve de point d'interet associe
            }
        );    
    }
    
    /**
     * Methode permettant de recuperer les participants a un evenement
     */
    getParticipants(data) {
        //A faire
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
    
    

    /**
     * A l'initialisation du composant
     */
    $onInit(){
        this.getEvent();
        
    }
}

export const EventContentComponent = {
    templateUrl: './views/app/components/eventContent/eventContent.component.html',
    controller: EventContentController,
    controllerAs: 'vm',
    bindings: {}
}
