let place = undefined;
class EventFormController {
    constructor(EventService, CategoryService, ToastService, DialogService, $log,$state) {
        'ngInject';

        this.ToastService = ToastService;
        this.$log = $log;
        this.$state = $state;
        this.DialogService = DialogService;
        this.EventService = EventService;
        this.CategoryService = CategoryService;
    }


    $onInit() {
        let currentDate = new Date();
        this.categories = [];
        this.category_picked = null;
        this.place = null;
        var dateOf5Min = this.addFiveMinutes(currentDate);
        var dateOf10Min = this.addFiveMinutes(dateOf5Min);
        this.heureDebut = this.formatNumber(dateOf5Min.getHours());
        this.minuteDebut = this.formatNumber(dateOf5Min.getMinutes());
        this.heureFin = this.formatNumber(dateOf10Min.getHours());
        this.minuteFin = this.formatNumber(dateOf10Min.getMinutes());
        this.dateDebut = dateOf5Min;
        this.dateFin = dateOf10Min;
        this.capacity = 1;
        this.public = false;

        this.CategoryService.findAll().then((response) => {
            angular.forEach(response, function(value) {
                let tab_ref = this;
                if(angular.isObject(value))
                    tab_ref.push(value);
            },this.categories);
        });
    }

    addFiveMinutes(date){
        return new Date(date.getTime()+(5*60*1000));
    }

    /**
     * Permet de récupérer les données liées a l'autocomplete de google maps
     * Necessaire pour le post de 'placeId"
     */
     placeChanged() {
        place = this.getPlace();
    }

    range(n) {
        var input = [];
        for (var i=0; i<n; i++) {
            input.push(this.formatNumber(i));
        }
        return input;
    }

    submit() {
        if(place === undefined)
            this.ToastService.error("Le lieu est requis pour créer l'événement");
        else{

            this.dateDebut.setHours(this.heureDebut);
            this.dateDebut.setMinutes(this.minuteDebut);
            this.dateFin.setHours(this.heureFin);
            this.dateFin.setMinutes(this.minuteFin);

            if(new Date().getTime() >= this.dateDebut.getTime() || this.dateFin.getTime() <= this.dateDebut.getTime())
                this.DialogService.alert("Erreur", "L'évenement ne doit pas se dérouler à une date passée, et la date de fin doit être après la date de début");
            else{
                var debut = this.dateToString(this.dateDebut, this.heureDebut, this.minuteDebut);
                var fin = this.dateToString(this.dateFin, this.heureFin, this.minuteFin);
                var placeOpen = this.placeIsOpen();
                if(!placeOpen.ouvert){
                    this.DialogService.confirm("Attention, ", placeOpen.message, "Oui", "Non")
                    .then(()=>{
                        this.verifCreateEvent(debut, fin);
                    }, ()=>{
                        this.ToastService.show('L\'evenement n\'a pas été créé');
                    });
                } else 
                    this.verifCreateEvent(debut, fin);
            }
        }
    }

    verifCreateEvent(debut, fin){
        var dates = {
            begin : debut,
            end : fin
        }

        this.EventService.findByOrganizer(dates).then(
            (responseSuccess) => {
                if(responseSuccess !== undefined){
                    var event = responseSuccess.data.events[0];
                    this.DialogService.alert('Vous avez déjà un événement dont vous êtes l\'un des organisateurs se déroulant au même moment.',
                        'Vous avez déjà un événement dont vous êtes l\'un des organisateurs se déroulant au même moment.'
                        +' Il s\'agit de '+ event.title +'.'
                        +' Il est décrit comme suit : '+ event.description
                        +' Vous ne pouvez donc pas créer de nouvel événement en même temps.'
                        );
                } else {
                    this.EventService.findByParticipant(dates).then(
                        (responseSuccess) => {
                            if(responseSuccess !== undefined){
                                var event = responseSuccess.data.events[0];
                                this.DialogService.confirm('Vous avez déjà une participation enregistrée se déroulant au même moment.',
                                    'Vous avez déjà une participation enregistrée se déroulant au même moment.'
                                    +' Il s\'agit de '+ event.title +'.'
                                    +' Il est décrit comme suit : '+ event.description
                                    +' Voulez-vous retirer votre participation déjà existante pour pouvoir tout de même créer celle-ci ?',
                                    'Oui', 'Non'
                                ).then(()=>{
                                    this.EventService.deleteParticipant({id: event.id}).then(
                                        (response) => {
                                            this.ToastService.show('La participation a bien été supprimée.');
                                            this.createEvent(debut, fin);
                                        }
                                    );
                                });
                            } else {
                                this.createEvent(debut, fin);
                            }
                        }
                    );
                }
            }
        );
    }

    /**
     * Methode permettant de savoir si un lieu sera ouvert au moment de l'evenement
     * Elle retourne un booleen afin de connaitre si l'utilisateur donne son autorisation quand même
     */
     placeIsOpen() {
        var res = {
            ouvert : true,
            message : ""
        }
        var found = false;
        //Si des horaires d'ouvertures sont envoyés, on regarde la correpondance
        if(place.opening_hours !== undefined){
            res.ouvert = false;
            var dayDebut = this.dateDebut.getDay();
            var dayFin = this.dateFin.getDay();
            var tempsDebut = this.heureDebut.toString() + this.minuteDebut.toString();
            var tempsFin = this.heureFin.toString() + this.minuteFin.toString();
            var openings = place.opening_hours.periods;
            var i = 0;
            var sizeOpening = openings.length;
            var opening = null;
            var open = null;
            var close = null;
            var multiDayEvent = (((this.dateFin.getTime() - this.dateDebut.getTime()) >= 24*60*60*1000) || dayDebut !== dayFin);
            while(i<sizeOpening && !(found || res.ouvert)){
                opening = openings[i];
                open = opening.open;
                close = opening.close;
                //On teste d'abord si l'evenement se déroule sur plusieurs jours ou si il dure jusqu'apres minuit
                if(multiDayEvent){
                    res.message = "Le lieu où vous souhaitez effectuer l'événement ne sera peut-être pas ouvert lors de l'événement. Voulez-vous quand même continuer ?";
                    return res;
                }
                else {
                    if(open.day === dayDebut){
                        //Sinon on teste si le jour de fermeture correspond au jour du début de l'evenement
                        if(tempsDebut >= open.time){ //Si l'evenement commence apres l'ouverture du lieu
                            if(tempsFin <= close.time){//Et qu'il se finit avant la fermeture du lieu
                                res.ouvert = true;
                            return res;
                        }
                            else{ //Sinon c'est que l'evenement se termine apres la fermeture
                                res.message = "Le lieu où vous souhaitez effectuer l'événement fermera peut-être avant la fin de l'événement. Voulez-vous quand même continuer ?";
                            return res;
                        }
                        } else { //Sinon c'est que l'evenement commence avant
                        res.message = "Le lieu où vous souhaitez effectuer l'événement ne sera peut-être pas encore ouvert au début de l'événement. Voulez-vous quand même continuer ?";
                        return res;
                    }
                } else if (close.day === dayDebut){
                        //Sinon on teste si le jour d'ouverture correspond au jour du début de l'evenement
                        if(close.time >= tempsDebut ){//Si l'evenement commence avant la fermeture du lieu
                            if(close.time >= tempsFin){ //Si l'evenement se termine avant la fermeture du lieu
                                res.ouvert = true;
                            return res;
                        }
                            else{ //Sinon l'evenement se termine apres la fermeture du lieu
                                res.message = "Le lieu où vous souhaitez effectuer l'événement fermera peut-être avant la fin de l'événement. Voulez-vous quand même continuer ?";
                            return res;
                        }
                        } else {//Sinon le lieu est deja ferme avant le debut de l'evenement
                        res.message = "Le lieu où vous souhaitez effectuer l'événement ne sera peut-être pas encore ouvert au début de l'événement. Voulez-vous quand même continuer ?";
                        return res;
                    }
                }
            }
            i++;
        }
    }

        if(!found && !res.ouvert) //Si on a pas trouver d'erreur, on affiche tout de même un message au cas ou.
            res.message = "Le lieu où vous souhaitez effectuer l'événement ne sera peut-être pas ouvert lors de l'événement. Voulez-vous quand même continuer ?";

        return res;
    }

    createEvent(debut, fin) {
        var data = {
            title: this.title,
            description: this.description,
            public: this.public,
            capacity: this.capacity,
            dateDebut: debut,
            dateFin: fin,
            idCategorie: this.category_picked.toString(),
            placeId: place.place_id,
            idParent: this.idParent
        };

        this.EventService.create(data).then(
            (response) => {
                this.ToastService.show('L\'événement a bien été ajouté.');
                return this.$state.go('app.landing');
            }
            );
    }

    dateToString(date, hour, minute) {
        var year = date.getFullYear();
        var month = date.getMonth()+1;
        var day = date.getDate();

        month = this.formatNumber(month);
        day = this.formatNumber(day);

        return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":00";
    }

    formatNumber(number){
        if(number<10)
            number = "0"+number;
        return number;
    }
}

export const EventFormComponent = {
    templateUrl: './views/app/components/eventForm/eventForm.component.html',
    controller: EventFormController,
    controllerAs: 'event',
    bindings: {}
}
