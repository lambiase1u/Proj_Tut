class PostGetAllController {
    constructor(API, $log, $scope, $mdSidenav, $timeout) {
        'ngInject';
        this.API = API;
        this.$log = $log;
        this.$scope = $scope;
        this.$timeout = $timeout;
        this.$mdSidenav = $mdSidenav;
    }

    $onInit() {
        this.API.all('posts').get('').then((response) => {
            this.$log.log(response.data.posts);
            //  this.ToastService.show('Post listed successfully');
            this.$scope.events = response.data.posts;
        });

    }

    buildToggler(componentId) {
        return function () {
            this.$mdSidenav(componentId).toggle();
        };
    }

    toggleLeft(){
       this.buildToggler('left');
        this.$log.log('test');
    }
    toggleRight(){
       this.buildToggler('right');
        this.$log.log('test');
    }




}

export const PostGetAllComponent = {
    templateUrl: './views/app/components/post_get_all/post_get_all.component.html',
    controller: PostGetAllController,
    controllerAs: 'vm',
    bindings: {}
}
