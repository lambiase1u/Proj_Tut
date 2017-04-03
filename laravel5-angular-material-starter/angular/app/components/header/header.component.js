class HeaderController{
    constructor($auth, ToastService){
        'ngInject';

        this.$auth = $auth;
        this.ToastService = ToastService;
    }

    $onInit(){
    }

    disconnect(){
        this.$auth.logout();
        this.ToastService.show("Vous avez bien été déconnecté");
    }
}

export const HeaderComponent = {
    templateUrl: './views/app/components/header/header.component.html',
    controller: HeaderController,
    controllerAs: 'vm',
    bindings: {}
}
