/**
 * Composant utilise dans l'affichage detaille d'un evenement
 */
class EventContentController{
    /**
     * Injection des dependances necessaires dans le constructeur, ici, des acces API
     */
    constructor(EventService, UserService, CategoryService, ToastService, DialogService, $state, $sce, $filter, $auth){
        'ngInject';

        this.EventService = EventService;
        this.UserService = UserService;
        this.CategoryService = CategoryService;
        this.ToastService = ToastService;
        this.DialogService = DialogService;
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
        this.invitations = null;
        this.weather = null;
        
        this.visibleDirections = false;
        this.visibleInvitations = false;
        this.userParticipation = false;
        
        this.organizersToAdd = [];
        this.guestsToAdd = [];
        
        this.alreadyExistingEventDialog = function() {
          this.DialogService.fromTemplate('alreadyExistingEventDialog');
        };
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
                this.getWeather(dataPlace);
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
                
                console.log(responseSuccess);
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
     * Methode permettant de recuperer les invites
     */
    getGuests(data) {
        this.EventService.getInvitations(data).then(
            (responseSuccess) => {
                //On a recupere les participants
                if(responseSuccess !== undefined)
                    this.invitations = responseSuccess.data.invitations;
                else
                    this.invitations = [];
            },
            (responseError) => {
                //On n'a pas trouve l'evenement associe
                console.log('Erreur');
            }
        );     
    }
    
    /**
     * Methode permettant de recuperer une liste filtree d'utilisateurs
     */
    getFilteredUserList(selector) {
        return this.UserService.findAll().then(
            (success) => {
                let users = [];
                
                success.forEach((user) => {
                    let combinedName = user.firstName + ' ' + user.name;
                    
                    if(combinedName.includes(selector))
                        users.push({id: user.id, name: user.firstName + " " + user.name, email: user.email });
                });

                return users;
            },
            (error) => {
                //En cas d'erreur
                return ['Impossible de charger les utilisateurs...'];
            }
        );
    }
    
    /**
     * Methode permettant de recuperer la meteo
     */
    getWeather(data) {
        this.EventService.getWeather(data).then(
            (responseSuccess) => {
                //On a recupere la meteo
                let dateOptimale = new Date();
                let heure = dateOptimale.getHours();
                
                if(heure >= 0 && heure <= 2)
                   dateOptimale.setHours(2, 0, 0);
                else if(heure > 2 && heure <= 5)
                    dateOptimale.setHours(5, 0, 0);
                else if(heure > 5 && heure <= 8)
                    dateOptimale.setHours(8, 0, 0);
                else if(heure > 5 && heure <= 11)
                    dateOptimale.setHours(11, 0, 0);
                else if(heure > 5 && heure <= 14)
                    dateOptimale.setHours(14, 0, 0);
                else if(heure > 5 && heure <= 17)
                    dateOptimale.setHours(17, 0, 0);
                else if(heure > 5 && heure <= 20)
                    dateOptimale.setHours(20, 0, 0);
                else if(heure > 5 && heure <= 23)
                    dateOptimale.setHours(23, 0, 0);
                
                let indexTableau = this.$filter('date')(dateOptimale, "yyyy-MM-dd HH:mm:ss");
                
                this.weather = responseSuccess[indexTableau];
            },
            (responseError) => {
                //On n'a pas reussi a recuperer la metot
                console.log('Erreur');
            }
        );
    }
    
    /**
     * Transforme les donnees meteo en une chaine de caracteres utile
     */
    textWeather() {
        if(this.weather !== null) {
            let temperature = Math.round(this.weather.temperature['sol'] - 273);
            let vent = Math.round(this.weather.vent_moyen['10m']);
            let pluie = Math.round(this.weather.pluie);
            
            let avisMeteo = "";
            
            if(temperature < 0)
                avisMeteo += "Il va faire très froid. La météo prévoit " + temperature + "°C.<br>";
            else if(temperature >= 0 && temperature <= 10)
                avisMeteo += "Il va faire froid. La météo prévoit " + temperature + "°C.<br>";
            else if(temperature > 10 && temperature <= 20)
                avisMeteo += "La température sera moyenne. La météo prévoit " + temperature + "°C.<br>";
            else if(temperature > 20 && temperature <= 30)
                avisMeteo += "De belles températures en perspective ! La météo prévoit " + temperature + "°C.<br>";
            else
                avisMeteo += "De grosses chaleurs sont attendues. La météo envisage " + temperature + "°C.<br>";
            
            if(pluie > 0 && pluie < 5)
                avisMeteo += " Quelques averses sont prévues. Pensez à prendre un parapluie !<br>";
            else if(pluie > 5)
                avisMeteo += " Des pluies relativement conséquentes sont prévues. Pensez à prendre un parapluie !<br>";
            else
                avisMeteo += " Aucune précipitation n'est prévue. Laissez votre parapluie à la maison !<br>";
            
            if(vent >= 15 && vent <= 30)
                avisMeteo += " Un peu de vent à prévoir avec " + vent + " km/h en moyenne.";
            else if(vent > 30)
                avisMeteo += " Beaucoup de vent à prévoir avec " + vent + " km/h en moyenne.";
            
            return avisMeteo;
        } else return "Les données météorologiques sont indisponibles pour le moment.";
    }
    
    /**
     * Methode permettant d'ajouter des organisateurs
     */
    addOrganizers() {
        let organizersToAddLength = this.organizersToAdd.length;
        let increment = 0;
        
        this.organizersToAdd.forEach((organizer) => {
            var data = {
                id: this.event.id,
                idUser: organizer.id
            }
            
            this.EventService.addOrganizer(data).then(
                (success) => {
                    increment++;
                    
                    if(increment === organizersToAddLength) {
                        this.organizersToAdd = [];
                        this.getOrganizers({ id: this.event.id });
                    }        
                }, 
                (error) => {
                    increment++;
                    
                    if(increment === organizersToAddLength) {
                        this.organizersToAdd = [];
                        this.getOrganizers({ id: this.event.id });
                    }
                    this.ToastService.error('Certains utilisateurs étaient déjà des organisateurs.');
                }
            ); 
        });
    }
    
    /**
     * Methode permettant d'ajouter des invites
     */
    addInvitations() {
        let guestsToAddLength = this.guestsToAdd.length;
        let increment = 0;
        
        this.guestsToAdd.forEach((guest) => {
            var data = {
                id: this.event.id,
                idUser: guest.id
            }
            
            this.EventService.addInvitation(data).then(
                (success) => {
                    increment++;
                    
                    if(increment === guestsToAddLength) {
                        this.guestsToAdd = [];
                        this.getGuests({ id: this.event.id });
                        this.visibleInvitations = false;
                    }        
                }, 
                (error) => {
                    increment++;
                    
                    if(increment === guestsToAddLength) {
                        this.guestsToAdd = [];
                        this.getGuests({ id: this.event.id });
                        this.visibleInvitations = false;
                    }
                    this.ToastService.error('Certains utilisateurs étaient déjà invités.');
                }
            ); 
        }); 
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
                    this.ToastService.error(error.data.message + " Il s'agit de : " + error.data.alreadyExistingEvent.title + ".");
                    
                    this.DialogService.confirm(error.data.message, error.data.message + " Il s'agit de " + error.data.alreadyExistingEvent.title + ". Sa description est : \"" + error.data.alreadyExistingEvent.description + "\" Voulez-vous retirer votre participation déjà existant pour pouvoir tout de même vous inscrire ?", 'Oui', 'Non').then(
                        () => {
                            this.EventService.deleteParticipant({ id: error.data.alreadyExistingEvent.id }).then(
                                (success) => {
                                    this.EventService.addParticipant(data).then(
                                        (success) => {
                                            this.ToastService.show(success.data);
                                            this.userParticipation = true;
                                            this.getParticipants(data);
                                        }
                                    );   
                                }
                            );
                        }
                    );
                }
            );   
        } else {
            this.ToastService.error('Vous devez être authentifié pour pouvoir participer à un événement.');
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
    
            if(!this.isOrganizer()) {
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
              this.DialogService.alert('Vous êtes organisateur de cet événement.', 'Vous êtes organisateur de cet événement. Par conséquent, vous ne pouvez pas retirer votre participation. Si vous êtes plusieurs à organiser cet événement, retirez-vous de la liste des organisateurs pour être en mesure de retirer votre participation.');  
            }  
        } else {
            this.ToastService.error('Vous devez être authentifié pour retirer votre participation à un événement.');
        } 
    }
    
    /**
     * Methode permettant de commenter un event
     */
    comment() {
        if(this.$auth.isAuthenticated()) {
            var data = {
                id: this.event.id,
                comment: this.commentForm
            }
            
            this.EventService.addComment(data).then(
                (success) => {
                    this.ToastService.show(success.data);
                    this.getComments(data);
                    this.commentForm = "";
                }, 
                (error) => {
                    console.log(error);
                }
            );   
        } else {
            this.ToastService.error('Vous devez être authentifié pour pouvoir commenter un événement.');
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
    
    isOrganizer() {
        let userIsOrganizer = false;
        
        if(this.$auth.isAuthenticated()) {
            if(this.organizers !== null && this.user !== null) {
                this.organizers.forEach((organizer) => {
                    if(organizer.id === this.user.id)
                        userIsOrganizer = true;
                })
            }
        }
        
        return userIsOrganizer;
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
        this.getGuests(data);
        this.getAuthenticatedUser();
    }
}

export const EventContentComponent = {
    templateUrl: './views/app/components/eventContent/eventContent.component.html',
    controller: EventContentController,
    controllerAs: 'vm',
    bindings: {}
}
