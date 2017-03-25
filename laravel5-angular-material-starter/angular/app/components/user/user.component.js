class UserController{
    constructor(API,$log){
        'ngInject';

        this.API = API;
        this.$log = $log;
        this.user = null;
    }

    $onInit(){


        this.API.all('auth/self').get('').then((response) => {
            this.$log.log(response.data);
            this.user = response.data.user;
        });
    }




}

export const UserComponent = {
    templateUrl: './views/app/components/user/user.component.html',
    controller: UserController,
    controllerAs: 'vm',
    bindings: {}
}
