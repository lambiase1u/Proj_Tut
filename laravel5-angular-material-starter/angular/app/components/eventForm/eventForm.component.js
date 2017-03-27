class EventFormController {
    constructor(API, ToastService, $log,$state) {
        'ngInject';

        this.API = API;
        this.ToastService = ToastService;
        this.$log = $log;
        this.categories = [];
        this.category_picked = null;
        this.place = null;
        this.$state = $state;
    }

    $onInit() {

        this.API.all('categories').get('').then((response) => {
            //log.log(response);

            angular.forEach(response, function(value) {

                let tab_ref = this;
                if(angular.isObject(value)){
                    tab_ref.push(value);
                }
            },this.categories);


        });

        //this.$log.log(this.categories);

    }

    submit() {
        var data = {
            title: this.title,
            description: this.description,
            public: this.public,
            capacity: this.capacity,
            date: this.date,
            idCategorie: this.category_picked.toString(),
            placeId: this.place.place_id,
            idParent: this.idParent
        };




        this.API.all('events').post(data).then((response) => {
            this.$log.log(response);
            this.ToastService.show('Event added successfully');
            return this.$state.go('app.landing');

        });
    }

}

export const EventFormComponent = {
    templateUrl: './views/app/components/eventForm/eventForm.component.html',
    controller: EventFormController,
    controllerAs: 'event',
    bindings: {}
}
