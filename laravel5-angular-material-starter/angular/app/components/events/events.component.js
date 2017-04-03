class EventsController{
    constructor(UserService, EventService,$log,$state,ToastService,NgMap){
        'ngInject';

       this.place = null;
       this.UserService = UserService;
       this.EventService = EventService;
       this.$log = $log;
       this.event = null;
       this.events = [];
       this.$state = $state;
       this.ToastService = ToastService;
       this.user = null;
       this.map = NgMap;
       this.location = { 
            lat : 0,
            lng : 0
        }

       this.positions =[];
    }

    $onInit(){
      //permet d'initialiser la position de la map
      this.UserService.getLocation().then((success) => {
          this.location = success.data.location;
      });

      //On initialise events
      this.EventService.findAll().then((success) => {
          this.events = success.data.listEvents;
          this.events.forEach((event) => {
            this.positions.push({lat: event.lat, lng: event.lng});
            this.extractDate(event);
          });
      });
    }

    extractDate(event){
      event.dateDebut = this.formatDate(event.dateDebut);
      event.dateFin = this.formatDate(event.dateFin);
      event.sameDay = (event.dateDebut.getDate() === event.dateFin.getDate());
      console.log(event.sameDay);
    }

    formatDate(dateString){
      var dateSplit = dateString.split(' ');
      var date = dateSplit[0];
      var time = dateSplit[1];
      var dateTime = new Date(date);
      var timeSplit = time.split(':');
      var hours = timeSplit[0];
      var minutes = timeSplit[1];
      dateTime.setHours(hours);
      dateTime.setMinutes(minutes);
      return dateTime;
    }

    seeEvent(id){
      this.$state.go('app.event_details', {id: id});
    }
}

export const EventsComponent = {
    templateUrl: './views/app/components/events/events.component.html',
    controller: EventsController,
    controllerAs: 'vm',
    bindings: {}
}