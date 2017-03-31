let place;
class EventFormController {
    constructor(API, ToastService, $log,$state,$scope) {
        'ngInject';

        this.API = API;
        this.ToastService = ToastService;
        this.$log = $log;
        this.categories = [];
        this.category_picked = null;
        this.place = null;
        this.$state = $state;
        this.heureDebut = "00";
        this.minuteDebut = "00";
        this.heureFin = "00";
        this.minuteFin = "00";
        this.dateDebut = new Date();
        this.dateFin = new Date();
    }


    $onInit() {
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
            if(i<10)
                input.push("0"+i);
            else
                input.push(i);
        }
        return input;
    }

    submit() {
       var dateTimeDebut = this.dateToString(this.dateDebut, this.heureDebut, this.minuteDebut);
       var dateTimeFin = this.dateToString(this.dateFin, this.heureFin, this.minuteFin);

        console.log(dateTimeDebut);

        var data = {
            title: this.title,
            description: this.description,
            public: this.public,
            capacity: this.capacity,
            dateDebut: dateTimeDebut,
            dateFin: dateTimeFin,
            idCategorie: this.category_picked.toString(),
            placeId: place.place_id,
            idParent: this.idParent
        };

        this.API.all('events').post(data).then((response) => {
            this.$log.log(response);
            this.ToastService.show('L\'événement a bien été ajouté.');
            return this.$state.go('app.landing');
        });
    }

    dateToString(date, hour, minute) {
        var year = date.getFullYear();
        var month = date.getMonth()+1;
        var day = date.getDate();

        if(month < 10)
            month = "0"+month;
        if(day < 10)
            day = "0"+day;

        return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":00";
    }

}

export const EventFormComponent = {
    templateUrl: './views/app/components/eventForm/eventForm.component.html',
    controller: EventFormController,
    controllerAs: 'event',
    bindings: {}
}
