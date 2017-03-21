class EventFormController {
    constructor(API, ToastService, $log) {
        'ngInject';

        this.API = API;
        this.ToastService = ToastService;
        this.$log = $log;
    }

    $onInit() {
    }

    submit() {
        var data = {
            title: this.title,
            description: this.description,
            public: this.public,
            capacity: this.capacity,
            date: this.date,
            idCategorie: this.idCategorie,
            placeId: this.placeId,
            idParent: this.idParent
        };

        this.API.all('events').post(data).then((response) => {
            this.$log.log(response);
            this.ToastService.show('Event added successfully');
        });
    }

}

export const EventFormComponent = {
    templateUrl: './views/app/components/eventForm/eventForm.component.html',
    controller: EventFormController,
    controllerAs: 'vm',
    bindings: {}
}
