class UsersController {
    constructor(ToastService, $state, $log, EventService, UserService,CategoryService, DialogService) {
        'ngInject';

        //services
        this.$state = $state;
        this.ToastService = ToastService;
        this.$log = $log;
        this.EventService = EventService;
        this.UserService = UserService;
        this.CategoryService = CategoryService;
        this.DialogService= DialogService;

        //user info
        this.user = null;
        this.me = false;
        this.apiKey = "AIzaSyDOoKSyoh_Lwe1r18KOVWhjbAHzsidDM00";

        //participation carousel
        this.lastParticipation = null;
        this.loadedLastParticipation = false;
        this.invitations = [];

        //orgarnisé  carousel
        this.my_event = [];
        this.loadedMyEevent = false;

        //carousel config
        this.nb_carousel_computer = 3;
        this.nb_carousel_phone = 1;
        this.nb_carousel_tablet = 2;
        this.breakPointTablet = 1426;
        this.breakPointPhone = 1142;

        this.slickConfig = {
            enabled: true,
            autoplay: false,
            dots: true,
            draggable: false,
            autoplaySpeed: 3000,
            slidesToShow: this.nb_carousel_computer,
            slidesToScroll: this.nb_carousel_computer,
            adaptiveHeight: true,
            method: {},
            event: {
                beforeChange: function (event, slick, currentSlide, nextSlide) {
                },
                afterChange: function (event, slick, currentSlide, nextSlide) {
                }
            },
            responsive: [
                {
                    breakpoint: this.breakPointTablet,
                    settings: {
                        slidesToShow: this.nb_carousel_tablet,
                        slidesToScroll: this.nb_carousel_tablet,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: this.breakPointPhone,
                    settings: {
                        slidesToShow: this.nb_carousel_phone,
                        slidesToScroll: this.nb_carousel_phone
                    }
                },
            ]
        };

    }

    /*
     * retourne l'utilsateur correspondant a l'id dans la route
     */
    findOneUser() {
        let id = this.$state.params.id;
        let userId = {"id": id};

        this.UserService.findOne(userId).then((response) => {
            this.user = response;
            this.participation();
            //this.invitation();
            this.my_Event();
        }, (error) => {
            console.log(error);
            return this.$state.go('app.landing');
        });
    }

    /**
     *permet de recuperer tout les utilisateurs
     -*/
    /*findAllUsers() {
     this.API.all('users').get('').then((response) => {
     this.$log.log(response.data);
     });
     }*/

    /*
     * permet de recuperer l'utilisateur actuellement connecté
     */
    findMe() {
        this.UserService.findMe().then((response) => {
            this.me = true;
            this.user = response.data.user;
            this.participation();
            this.my_Event();
            this.invitation();
        });
    }

    /*
    * recupere tout les événements auquel est invité l'utilisateurs
     */
    invitation() {
        let data = {"id": this.user.id};
        this.UserService.getInvitations(data).then((response) => {
            this.invitations = response;
        });
    }

    exportCalendar(){

        let html = 'http://localhost:8000/api/users/'+this.user.id+'/calendar';

        this.DialogService.alert('Lien d\'export du calendrier', html);
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
                let idCateg = {"id": res.idCategorie};

                ctrl.CategoryService.findOne(idCateg).then((success) => {
                    res.categ =success;
                });

                ctrl.EventService.getParticipants(eventId).then((response) => {
                    let nb_participant = response.data.participants.length;
                    res.nbParticipant = nb_participant;
                });

                res.positions = {
                    pos: [
                        Number(res.lat),
                        Number(res.lng)
                    ]
                }

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
                    let idCateg = {"id": res.idCategorie};

                    ctrl.CategoryService.findOne(idCateg).then((success) => {
                        res.categ =success;
                    });

                    ctrl.EventService.getParticipants(eventId).then((response) => {
                        let nb_participant = response.data.participants.length;
                        res.nbParticipant = nb_participant;
                    });

                    ctrl.positions = {
                        pos: [
                            Number(res.lat),
                            Number(res.lng)
                        ]
                    };

                });

            }
        );

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

    /*
     * Methode de redirection vers la page d'un événement
     * @param id : idUser
     */
    event_details(id) {
        return this.$state.go('app.event_details', {"id": id});
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

    redirectToCalendar(){
        return this.$state.go('app.calendar_user', {"id": this.user.id});
    }
}

export const UsersComponent = {
    templateUrl: './views/app/components/users/users.component.html',
    controller: UsersController,
    controllerAs: 'vm',
    bindings: {}
}
