class UsersController {
    constructor(API, ToastService, $state, $log) {
        'ngInject';

        this.API = API;
        this.$state = $state;
        this.ToastService = ToastService;
        this.user = null;
        this.$log = $log;
        this.lastParticipation = null;
        this.dataLoaded = false;
        this.nb_carousel_last_participation = 3;
        this.nb_event_carousel_last_participation = 9;
        this.position = [];
        this.invitations=[];


    }

  /*
  * retourne l'utilsateur correspondant a l'id dans la route 
  */
    findOneUser() {
        let id = this.$state.params.id;

        this.API.all('users/' + id).get('').then((response) => {
            this.user = response.data.user;
            this.participation();
         // this.$log.log(response.data.user);
        });
    }

  /**
  *permet de recuperer tout les utilisateurs
  -*/
    findAllUsers() {
        this.API.all('users').get('').then((response) => {
            // this.user =  response.data.user;
            this.$log.log(response.data);
        });
    }

  /*
  * permet de recuperer l'utilisateur actuellement connecté 
  */
    findMe() {
        this.API.all('users/self').get('').then((response) => {
            this.user = response.data.user;
            //this.$log.log(response.data.user);
            this.participation();
            this.invitation();
        })
    }

    invitation(){
        this.API.all('users/'+this.user.id+'/invitation').get('').then((response) => {
           // this.$log.log(response.data);
            this.invitations = response;
        });
    }

  /*
  * Permet de recuperer toute les évenements (localisation aussi) d'un utilisateurs et d'initializé les cartes google map
  */
    participation() {
        //this.$log.log('users/' + this.user.id + '/participate');

        let ctrl = this;
        this.API.all('users/' + this.user.id + '/participate/' + this.nb_event_carousel_last_participation).get('').then((response) => {
           // this.$log.log(response[0]);
            this.lastParticipation = response;

        }).finally(function () {
            ctrl.dataLoaded = true;

            let eventLocationLoad = false;

            angular.forEach(ctrl.lastParticipation, function (location) {
                ctrl.position.push(
                    {
                        pos: [
                            location.pos.lat,
                            location.pos.long
                        ]
                    }
                );
            });


            /*coté front c'est la galere
             if (eventLocationLoad == false) {
             let geocoder = new google.maps.Geocoder;
             angular.forEach(ctrl.lastParticipation, function (event) {

             geocoder.geocode({'placeId': event.placeId}, function (results, status) {

             if (status === google.maps.GeocoderStatus.OK) {

             angular.forEach(results, function (pos) {

             event.pos = {
             pos: [
             pos.geometry.location.lat(),
             pos.geometry.location.lng()
             ]
             }

             });


             } else {

             console.log('fuck');
             }

             });

             });

             }
             **/
        });


    }

  /*
  * Le timeout permet d'afficher le caroussel comme il se doit 
  * j'ai trouvé cette solution directement dans les issues du dépot slick carousel
  */
    carouselInit() {

        $timeout(function () {
            this.ready = true;
        }, 1000);
        // ;
    }

    /**
     * Methode de base , permettant de variables les bonnes variables pour la vue, celle ci fait le meme traitement
     * pour afficher les bonnes DIV HTML
     */

    $onInit() {

        switch (this.$state.$current.self.name) {
            case "app.users_all" :
                this.findAllUsers();
                break;
            case "app.users_id" :
                this.findOneUser();
                break;
            case "app.users_me" :
                this.findMe();
                break;
        }


    }
}

export const UsersComponent = {
    templateUrl: './views/app/components/users/users.component.html',
    controller: UsersController,
    controllerAs: 'vm',
    bindings: {}
}
