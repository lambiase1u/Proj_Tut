class HeaderController{
    constructor(API,$log){
        'ngInject';

        this.API = API;
        this.$log = $log;
        this.user = null;
    }

    $onInit(){


        this.API.all('auth/self').get('').then((response) => {
            this.user = response.data.user;
        },function(){

        });
    }
}

export const HeaderComponent = {
    templateUrl: './views/app/components/header/header.component.html',
    controller: HeaderController,
    controllerAs: 'vm',
    bindings: {}
}
