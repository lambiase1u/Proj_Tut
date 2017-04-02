let place;
class EventFormController {
    constructor(EventService, API, ToastService, DialogService, $log,$state) {
        'ngInject';

        this.API = API;
        this.ToastService = ToastService;
        this.$log = $log;
        this.$state = $state;
        this.DialogService = DialogService;
        this.EventService = EventService;
    }


    $onInit() {
        let currentDate = new Date();
        this.categories = [];
        this.category_picked = null;
        this.place = null;
        this.heureDebut = this.formatNumber(currentDate.getHours());
        this.minuteDebut = this.formatNumber(currentDate.getMinutes());
        this.heureFin = this.heureDebut;
        this.minuteFin = this.formatNumber(currentDate.getMinutes());
        this.dateDebut = currentDate;
        this.dateFin = currentDate;
        this.capacity = 1;
        this.public = false;

        this.API.all('categories').get('').then((response) => {
            angular.forEach(response, function(value) {
                let tab_ref = this;
                if(angular.isObject(value))
                    tab_ref.push(value);
            },this.categories);
        });
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
        var debut = this.dateToString(this.dateDebut, this.heureDebut, this.minuteDebut);
        var fin = this.dateToString(this.dateFin, this.heureFin, this.minuteFin);

        var dates = {
            begin : debut,
            end : fin
        }

        this.API.one('users', 'self').all('organizations').get('',dates).then(
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
                    this.API.one('users', 'self').all('participations').get('',dates).then(
                        (responseSuccess) => {
                            if(responseSuccess !== undefined){
                                var event = responseSuccess.data.events[0];
                                this.DialogService.confirm('Vous avez déjà une participation enregistrée se déroulant au même moment.',
                                    'Vous avez déjà une participation enregistrée se déroulant au même moment.'
                                    +' Il s\'agit de '+ event.title +'.'
                                    +' Il est décrit comme suit : '+ event.description
                                    +' Voulez-vous retirer votre participation déjà existante pour pouvoir tout de même créer celle-ci ?'
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

        this.API.all('events').post(data).then(
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
