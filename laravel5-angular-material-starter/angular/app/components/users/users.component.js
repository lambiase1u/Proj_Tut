class UsersController {
    constructor(API, ToastService, $state, $log, EventService, UserService) {
        'ngInject';

        //services
        this.API = API;
        this.$state = $state;
        this.ToastService = ToastService;
        this.user = null;
        this.$log = $log;
        this.EventService = EventService;
        this.UserService = UserService;

        //participation carousel
        this.lastParticipation = null;
        this.loadedLastParticipation = false;
        this.nb_carousel_last_participation = 3;
        this.nb_event_carousel_last_participation = 9;
        this.position = [];
        this.invitations = [];

        //orgarnisé  carousel
        this.my_event = [];
        this.loadedMyEevent = false;
        this.positions = [];

        this.slickConfig = {
            enabled: true,
            autoplay: false,
            dots: true,
            draggable: false,
            autoplaySpeed: 3000,
            slidesToShow: this.nb_carousel_last_participation,
            slidesToScroll: this.nb_carousel_last_participation,
            adaptiveHeight: true,
            method: {},
            event: {
                beforeChange: function (event, slick, currentSlide, nextSlide) {
                },
                afterChange: function (event, slick, currentSlide, nextSlide) {
                }
            }
        };

    }

    /*
     * retourne l'utilsateur correspondant a l'id dans la route
     */
    findOneUser() {
        let id = this.$state.params.id;
        let userId = {"id": id};
        this.UserService.findOne(userId).then((response)=>{
            this.user = response;
            this.participation();
            this.invitation();
            this.my_Event();
        });
    }

    /**
     *permet de recuperer tout les utilisateurs
     -*/
    findAllUsers() {
        this.API.all('users').get('').then((response) => {
            this.$log.log(response.data);
        });
    }

    /*
     * permet de recuperer l'utilisateur actuellement connecté
     */
    findMe() {
        this.UserService.findMe().then((response)=>{
            this.user = response.data.user;
            this.participation();
            this.invitation();
            this.my_Event();
        });
    }

    invitation() {
        this.API.all('users/' + this.user.id + '/invitation').get('').then((response) => {
            this.invitations = response;
        });
    }

    /*
     * Permet de recuperer toute les évenements (localisation aussi) d'un utilisateurs et d'initializé les cartes google map
     */
    participation() {
        let ctrl = this;
        let userId = {"id": this.user.id};

        this.UserService.getParicipant(userId).then((res) => {
            this.lastParticipation = res;
        }).finally(() => {
            ctrl.loadedLastParticipation = true;

            angular.forEach(ctrl.lastParticipation, function (res) {
                let eventId = {"id": res.id};

                ctrl.EventService.getParticipants(eventId).then((response) => {
                    let nb_participant = response.data.participants.length;
                    res.nbParticipant = nb_participant;
                });

                let placeId = {"id": res.placeId};
                ctrl.EventService.getPlace(placeId).then((placeResult) => {
                    res.location = placeResult.result.geometry.location;
                    ctrl.positions.push({
                            pos: [
                                Number(res.location.lat),
                                Number(res.location.lng)
                            ]
                        }
                    );
                });

            });
        });

    }

    my_Event() {

        let ctrl = this;
        let userId = {"id": this.user.id};

        this.UserService.getEventUser(userId).then((response) => {
            this.my_event = response;
        }).finally(() => {
            ctrl.loadedMyEevent = true;
            angular.forEach(ctrl.my_event, function (res) {

                let eventId = {"id": res.id};
                ctrl.EventService.getParticipants(eventId).then((response) => {
                    let nb_participant = response.data.participants.length;
                    res.nbParticipant = nb_participant;
                });

                let placeId = {"id": res.placeId};
                ctrl.EventService.getPlace(placeId).then((placeResult) => {
                    res.location = placeResult.result.geometry.location;
                    ctrl.positions.push({
                            pos: [
                                Number(res.location.lat),
                                Number(res.location.lng)
                            ]
                        }
                    );
                });

            });

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


    getEvent(data) {
        this.EventService.findOne(data).then(function (result) {
                return result.data.event;
            },
            (responseError) => {
                console.log(responseError);

            });
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
