let vm;

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
       vm=this;

       this.positions =[];
    }


    findMe(){
        this.API.all('users/self').get('').then((response) => {
            this.user = response.data.user;
            this.$log.log(response);
        });
    }

    /**
     * Méthode permettant d'afficher un évènement sur la sidebar de la page d'accueil 'landing" suite à un click
     * @param object_map, par défaut en 1er argument, imposé par ngMap
     * @param event, l'évènement passé en paramètre dans la vue ( 'p' dans notre cas )
     */
    details(object_map,event){
        vm.event = event.details;
        vm.$log.log(vm.event);
    }

    findAll(){



        let log = this.$log;
        let api = this.API;
        let vm = this;
        let geocoder = new google.maps.Geocoder;

        /**
         * Appel a l'API pour récuperer tous les évènements
         */
        this.API.all('events').get('').then((response) => {
           // this.$log.log(response.data.listEvents);
            this.events = response.data.listEvents;

            /**
             * On récupère les coordonnés de tous les évènements à partir de leur placeID grâce a l'API de google geocode
             */
            angular.forEach(this.events , function(event){

                geocoder.geocode({'placeId': event.placeId}, function(results, status) {
                    if (status === google.maps.GeocoderStatus.OK) {

                        vm.positions.push({pos:[results[0].geometry.location.lat(), results[0].geometry.location.lng()],details:event},)
                    } else {
                    }
                });

            });

            /**
             * On ajoute au tableau d'évènement, les données relatives aux organisateurs afin de savoir si l'utilisateur
             * courant est le proprietaire
             */
            angular.forEach(this.events , function(key){
               // log.log(key);

                api.all('events/'+key.id+"/organizers").get('').then((response) => {
                    // this.$log.log(response.data.listEvents);

                    if(!angular.isUndefined(response)){

                        key.organizers = response.data.organizers[0];
                        key.show = false;
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


    /**
     * Methode de base , permet de remplir le tableau d'events si on est sur la page d'accueil ( landing )
     * et la variable event si on est sur une page d'un evenement précis grace à son id
     */
    $onInit(){

        this.findMe();
        let log = this.$log;



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
