class UserController{
    constructor(API,$log,$auth,$rootScope){
        'ngInject';

        this.API = API;
        this.$log = $log;

        this.user = $rootScope.user;

    }

    $onInit(){




    }




}

export const UserComponent = {
    templateUrl: './views/app/components/user/user.component.html',
    controller: UserController,
    controllerAs: 'vm',
    bindings: {}
}
