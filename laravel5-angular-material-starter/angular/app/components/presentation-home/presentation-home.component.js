class PresentationHomeController{
    constructor($auth){
        'ngInject';

        this.$auth = $auth
    }

    $onInit(){
    }

    isConnected() {
        return this.$auth.isAuthenticated();
    }
}

export const PresentationHomeComponent = {
    templateUrl: './views/app/components/presentation-home/presentation-home.component.html',
    controller: PresentationHomeController,
    controllerAs: 'presentationHome',
    bindings: {}
}
