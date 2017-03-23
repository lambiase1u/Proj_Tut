class UserController {
    constructor(API, $scope, ToastService, $log) {
        'ngInject';

        this.API = API;
        this.$scope = $scope;
        this.ToastService = ToastService;
        this.$log = $log;
    }

    $onInit() {
        this.$scope.arrayData = [
            {src: 'http://www.francetvinfo.fr/image/75e490efj-61bb/260/146/12104700.jpg'},
            {src: 'http://www.francetvinfo.fr/image/75e490efj-61bb/260/146/12104700.jpg'},
            {src: 'http://www.francetvinfo.fr/image/75e490efj-61bb/260/146/12104700.jpg'}
        ];

        this.$log.log(this.$scope.arrayData);

        this.$scope.slideIndex = 1;
        $("#slider").slick();
    }


}

export const UserComponent = {
    templateUrl: './views/app/components/user/user.component.html',
    controller: UserController,
    controllerAs: 'userCtrl',
    bindings: {}
}
