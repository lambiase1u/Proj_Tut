class EventsController{
    constructor(API,$log,$state,ToastService,NgMap){
        'ngInject';

       this.place = null;
       this.API = API;
       this.$log = $log;
       this.event = null;
       this.events = [];
       this.$state = $state;
       this.ToastService = ToastService;
       this.user = null;
        this.map = NgMap;


       this.positions =[
            {pos:[40.71, -74.21]},
            {pos:[41.72, -73.20]},
            {pos:[42.73, -72.19]},
            {pos:[43.74, -71.18]},
            {pos:[44.75, -70.17]},
            {pos:[45.76, -69.16]},
            {pos:[46.77, -68.15]}
        ];
    }


    findMe(){
        this.API.all('users/self').get('').then((response) => {
            this.user = response.data.user;
            this.$log.log(response);
        });
    }


    findAll(){



        let log = this.$log;
        let api = this.API;


        this.API.all('events').get('').then((response) => {
           // this.$log.log(response.data.listEvents);
            this.events = response.data.listEvents;


            angular.forEach(this.events , function(key){
               // log.log(key);

                api.all('events/'+key.id+"/organizers").get('').then((response) => {
                    // this.$log.log(response.data.listEvents);

                    if(!angular.isUndefined(response)){

                        key.organizers = response.data.organizers[0];
                        //log.log(key);
                    }



                });


            });


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

        this.findMe();

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
