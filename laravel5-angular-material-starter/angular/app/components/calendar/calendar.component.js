class CalendarController {
    constructor(ToastService, $state, $log, EventService, UserService, $filter, MaterialCalendarData, $timeout) {
        'ngInject';
        //services
        this.$state = $state;
        this.ToastService = ToastService;
        this.$log = $log;
        this.EventService = EventService;
        this.UserService = UserService;
        this.$filter = $filter;
        this.MaterialCalendarData = MaterialCalendarData;
        this.$timeout = $timeout;

        //calendar
        this.selectedDate = null;
        this.firstDayOfWeek = null;
        this.direction = null;
        this.msg = "";

        //user info
        this.user = null;
        this.lastParticipation = null;
        this.my_event = null;
        this.month = new Date().getMonth() + 1;
    }

    /*
     * recuperation  du param id dans la route
     * et reucupération du user
     */
    $onInit() {
        let id = this.$state.params.id;
        let userId = {"id": id};
        let ctrl = this;

        this.UserService.findOne(userId).then((response) => {
            this.user = response;
            this.initCalendar();
            this.displayEvent();
        }, (error) => {
            console.log(error);
            return this.$state.go('app.landing');
        });

    }

    /**
     * initilise les parametre du calendrier et les fonctions appelé par ses attr html
     */
    initCalendar() {
        let ctrl = this;
        this.selectedDate = null;


        this.firstDayOfWeek = 0;
        this.setDirection = function (direction) {
            ctrl.direction = direction;
        };
        this.dayClick = function (date) {
            ctrl.msg = "You clicked " + this.$filter("date")(date, "MMM d, y h:mm:ss a Z");
        };

        /**
         * EvenListener du boutou  mois précedant
         * recupere le mois selectioné
         */
        this.prevMonth = function (data) {
            ctrl.msg = "You clicked (prev) month " + data.month + ", " + data.year;
            ctrl.month = data.month;

            let nbDayMonth = ctrl.getNumberOfDays(data.year, data.month);
            ctrl.cleanBackgroundCell(nbDayMonth);

            ctrl.$timeout(function () {
                ctrl.displayEvent();
            }, 500);
        };

        /**
         * EvenListener du boutou prochain moins
         * recupere le mois selectioné
         */
        this.nextMonth = function (data) {
            ctrl.month = data.month;
            ctrl.msg = "You clicked (next) month " + data.month + ", " + data.year;

            let nbDayMonth = ctrl.getNumberOfDays(data.year, data.month);
            ctrl.cleanBackgroundCell(nbDayMonth);

            ctrl.$timeout(function () {
                ctrl.displayEvent();
            }, 500);
        };

    }


    /*
     * recupere nombre de jours pour le mois et l'année placé en param
     */
    getNumberOfDays(year, month) {
        let isLeap = ((year % 4) == 0 && ((year % 100) != 0 || (year % 400) == 0));
        return [31, (isLeap ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
    }

    /*
     * permet de remmettre tout les fond en blanc avant changement de mois
     */
    cleanBackgroundCell(end) {
        for (let i = 0; i <= end; i++) {
            let clickedDayDiv = angular.element(document.querySelectorAll('[tabindex="' + i + '"]'));
            clickedDayDiv.css("background-color", "white");
        }
    }

    /*
     * permet d'afficher tout les événements dans le calendrier
     */
    displayEvent() {
        let ctrl = this;
        let idUser = {"id": this.user.id};
        this.UserService.getEventUser(idUser).then((respsonse) => {
            this.lastParticipation = respsonse;
        }).finally(() => {

            angular.forEach(ctrl.lastParticipation, function (res) {

                let dateDebut = new Date(res.dateDebut);
                let dateFin = new Date(res.dateFin);

                let html = '<h3>' + res.title + '</h3>';
                ctrl.MaterialCalendarData.setDayContent(dateDebut, html);

                if (dateDebut.getMonth() + 1 === ctrl.month) {
                    ctrl.highLightRange(dateDebut.getDate(), dateFin.getDate(), "orange");
                }
            });
        });

        this.UserService.getEventUser(idUser).then((response) => {
            this.my_event = response;
        }).finally(() => {
            ctrl.loadedMyEevent = true;
            angular.forEach(ctrl.my_event, function (res) {

                let dateDebut = new Date(res.dateDebut);
                let dateFin = new Date(res.dateFin);

                let html = '<h3>' + res.title + '</h3>';

                ctrl.MaterialCalendarData.setDayContent(dateDebut, html);

                if (dateDebut.getMonth() + 1 === ctrl.month) {
                    ctrl.highLightRange(dateDebut.getDate(), dateFin.getDate(), "orange");
                }

            });
        });
    }

    /*
     * prend une date de début et de fin et change la coleur de fond
     * @param start : jour de debut
     * @param end : jour de fin
     * @param background: couleur de fon desiré
     */
    highLightRange(start, end, background) {
        for (var i = start; i <= end; i++) {
            var clickedDayDiv = angular.element(document.querySelectorAll('[tabindex="' + i + '"]'));
            clickedDayDiv.css("background-color", background);
        }
    }

    /*
     * permet de modifier l'agencement du calendrier
     */
    setDirection(direction) {
        this.direction = direction;
        this.dayFormat = direction === "vertical" ? "EEEE, MMMM d" : "d";
    };


    /*
     * Methode de redirection vers la page d'un événement
     * @param id : idUser
     */
    event_details(id) {
        console.log('ok');
        return this.$state.go('app.event_details', {"id": id});
    }


}

export const CalendarComponent = {
    templateUrl: './views/app/components/calendar/calendar.component.html',
    controller: CalendarController,
    controllerAs: 'vm',
    bindings: {}
}
