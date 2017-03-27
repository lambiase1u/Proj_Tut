class HeaderController{
    constructor($auth){
        'ngInject';

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
