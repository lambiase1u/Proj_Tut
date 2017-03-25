class HeaderController{
    constructor(API,$log,$auth){
        'ngInject';

        this.API = API;
        this.$log = $log;
        this.user = null;
        this.$auth = $auth;

    }

    $onInit(){




    }
}

export const HeaderComponent = {
    templateUrl: './views/app/components/header/header.component.html',
    controller: HeaderController,
    controllerAs: 'vm',
    bindings: {}
}
