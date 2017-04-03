class BannerHomeController{
    constructor($auth){
        'ngInject';
        this.$auth = $auth
        //
    }

    $onInit(){
    }

    isConnected() {
        return this.$auth.isAuthenticated();
    }
}

export const BannerHomeComponent = {
    templateUrl: './views/app/components/banner-home/banner-home.component.html',
    controller: BannerHomeController,
    controllerAs: 'banner',
    bindings: {}
}
