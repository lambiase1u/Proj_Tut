class UsersController {
    constructor(API, ToastService, $state, $log, $http) {
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
        this.$http = $http;


    }

    findOneUser() {
        let id = this.$state.params.id;

        this.API.all('users/' + id).get('').then((response) => {
            this.user = response.data.user;
            this.participation();
            this.$log.log(response.data.user);
        });
    }

    findAllUsers() {
        this.API.all('users').get('').then((response) => {
            // this.user =  response.data.user;
            this.$log.log(response.data);
        });
    }

    findMe() {
        this.API.all('users/self').get('').then((response) => {
            this.user = response.data.user;
            this.$log.log(response.data.user);
            this.participation();
        });
    }

    participation() {
        this.$log.log('users/' + this.user.id + '/participate');

        let ctrl = this;


        this.API.all('users/' + this.user.id + '/participate/' + this.nb_event_carousel_last_participation).get('').then((response) => {
            this.$log.log(response[0]);
            this.lastParticipation = response;

        }).finally(function () {
            ctrl.dataLoaded = true;

                let geocoder = new google.maps.Geocoder;

                angular.forEach(ctrl.lastParticipation, function (event) {

                    geocoder.geocode({'placeId': event.placeId}, function (results, status) {

                        if (status === google.maps.GeocoderStatus.OK) {
                            console.log(results);
                        } else {

                            console.log('fuck');
                        }

                    });

                });

        });

    }

    carouselInit() {
        console.log(this.dataLoaded);

        $timeout(function () {
            ctrl.ready = true;
        }, 1000);
        // ;
    }

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
