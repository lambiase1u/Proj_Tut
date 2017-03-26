class EventsController{
    constructor(){
        'ngInject';

       this.place = null;
    }

    $onInit(){



    }



}

export const EventsComponent = {
    templateUrl: './views/app/components/events/events.component.html',
    controller: EventsController,
    controllerAs: 'vm',
    bindings: {}
}
