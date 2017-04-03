let vm;

class EventsController{
    constructor(UserService,$log,$state,ToastService,NgMap){
        'ngInject';

       this.place = null;
       this.UserService = UserService;
       this.$log = $log;
       this.event = null;
       this.events = [];
       this.$state = $state;
       this.ToastService = ToastService;
       this.user = null;
       this.map = NgMap;
       vm=this;
       this.location = { 
            lat : 0,
            lng : 0
        }

       this.positions =[];
    }


    /**
     * Methode de base , permet de remplir le tableau d'events si on est sur la page d'accueil ( landing )
     * et la variable event si on est sur une page d'un evenement précis grace à son id
     */
    $onInit(){
        this.UserService.getLocation().then((success) => {
            this.location = success.data.location;
        });
    }
}

export const EventsComponent = {
    templateUrl: './views/app/components/events/events.component.html',
    controller: EventsController,
    controllerAs: 'vm',
    bindings: {}
}