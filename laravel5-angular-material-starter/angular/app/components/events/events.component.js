class EventsController{
    constructor(API,$log,$state,ToastService){
        'ngInject';

       this.place = null;
       this.API = API;
       this.$log = $log;
       this.event = null;
       this.events = [];
       this.$state = $state;
       this.ToastService = ToastService;

    }


    findAll(){
        this.API.all('events').get('').then((response) => {
            this.$log.log(response.data.listEvents);
            this.events = response.data.listEvents;
        });

    }


    findOne(){
        let id = this.$state.params.id;

        this.API.all('events/'+id).get('').then((response) => {
            this.$log.log(response.data.event);
            this.event = response.data.event;
        });

    }

    $onInit(){



        switch(this.$state.$current.self.name){
            case "app.landing" :
                this.findAll();
                break;
            case "app.event_id" :
                this.findOne();
                break;
        }



    }

    participate(id){


        this.$log.log("participe button");
        let toast = this.ToastService;
        var data = {};

        this.API.all('events/'+id+'/participate').post(data).then((response) => {
            this.ToastService.show("Vous participate désormais à l'évènement");
        }).catch(function(response) {
            toast.error("Vous y participatez déjà ");
        });
    }




    event_create(){
        return this.$state.go('app.event_create');
    }



}

export const EventsComponent = {
    templateUrl: './views/app/components/events/events.component.html',
    controller: EventsController,
    controllerAs: 'vm',
    bindings: {}
}
