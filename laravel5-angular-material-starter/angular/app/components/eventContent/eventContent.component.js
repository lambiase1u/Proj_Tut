/**
 * Composant utilise dans l'affichage detaille d'un evenement
 */
class EventContentController{
    /**
     * Injection des dependances necessaires dans le constructeur, ici, des acces API
     */
    constructor(EventService, UserService, CategoryService, ToastService, $state, $sce, $filter, $auth){
        'ngInject';

        this.EventService = EventService;
        this.UserService = UserService;
        this.CategoryService = CategoryService;
        this.ToastService = ToastService;
        this.$state = $state;
        this.$sce = $sce;
        this.$filter = $filter;
        this.$auth = $auth;
        
        this.event = null;
        this.place = null;
        this.organizers = null;
        this.participants = null;
        this.category = null;
        this.comments = null;
        this.directions = null;
        this.user = null;
        
        this.visibleDirections = false;
        this.userParticipation = false;
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
                this.directions = responseSuccess.routes[0];
            },
            (responseError) => {
                //Erreur
                console.log(responseError);
            }
        )
    }
    
    /**
     * Methode permettant de recuperer l'utilisateur authentifie
     */
    getAuthenticatedUser() {
        if(this.$auth.isAuthenticated()) {
            this.UserService.findMe().then(
                (responseSuccess) => {
                    this.user = responseSuccess.data.user;
                    this.checkUserParticipation();
                },
                (responseError) => {
                    console.log(responseError);
                }
            );
        }
    }
    
    /**
     * Methode permettant de calculer si l'utilisateur dispose d'assez de temps pour se rendre sur les lieux de l'evenement
     */
    enoughTime() {
        if(this.directions !== null) {
            let dateArrivee = new Date().getTime() + this.directions.legs[0].duration.value;
        
            let date = this.splitDate(this.event.dateDebut);

            let dateDebut = new Date(date.date);
            dateDebut.setHours(date.hour, date.minutes);

            return dateDebut.getTime() > dateArrivee;    
        } else return true;
    }
    
    /**
     * Methode permettant de spliter une date en un tableau
     */
    splitDate(dateParam) {
        if(dateParam !== undefined) {
            let dateSplit = dateParam.split(' ');
            let date = dateSplit[0];
            let hours = dateSplit[1].split(':');

            var arrayDate = {
                date: date,
                hour: hours[0],
                minutes: hours[1]
            }

            return arrayDate;
        } else return false;
    }
    
    /**
     * Methode permettant de rendre une datetime lisible par un humain
     */
    formatDateTime(date) {
        let splittedDate = this.splitDate(date);
        
        return this.$filter('date')(splittedDate.date, "dd/MM/yyyy") + " à " + splittedDate.hour + ":" + splittedDate.minutes;
    }
    
    /**
     * Methode permettant a un utilisateur de participer a un evenement
     */
    addParticipation() {
        if(this.$auth.isAuthenticated()) {
            var data = {
                id: this.event.id
            }    
    
            this.EventService.addParticipant(data).then(
                (success) => {
                    this.ToastService.show(success.data);
                    this.userParticipation = true;
                    this.getParticipants(data);
                },
                (error) => {
                    console.log(error);
                }
            );   
        } else {
            ToastService.error('Vous devez être authentifié pour pouvoir participer à un événement.');
        } 
    }
    
    /**
     * Methode permettant de supprimer la participation a un evenement
     */
    deleteParticipation() {
        if(this.$auth.isAuthenticated()) {
            var data = {
                id: this.event.id
            }    
    
            this.EventService.deleteParticipant(data).then(
                (success) => {
                    this.ToastService.show(success.data);
                    this.userParticipation = false;
                    this.getParticipants(data);
                },
                (error) => {
                    console.log(error);
                }
            );   
        } else {
            ToastService.error('Vous devez être authentifié pour retirer votre participation à un événement.');
        } 
    }
    
    /**
     * Methode permettant a un utilisateur d'editer l'evenement s'il est organisateur
     */
    editerEvent() {
        
    }
    
    /**
     * Methode permettant de verifier si un utilisateur participe a un evenement
     */
    checkUserParticipation() {
        if(this.$auth.isAuthenticated()) {
            if(this.participants !== null && this.user !== null) {
                this.participants.forEach((participant) => {
                   if(participant.id === this.user.id)
                       this.userParticipation = true;
                });
            }
        } else this.userParticipation = false;
    }
    
    /**
     * Lorsque quelque chose change
     */
    $onChanges() {
        this.checkUserParticipation(); 
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
        this.getAuthenticatedUser();
    }
}

export const EventContentComponent = {
    templateUrl: './views/app/components/eventContent/eventContent.component.html',
    controller: EventContentController,
    controllerAs: 'vm',
    bindings: {}
}
