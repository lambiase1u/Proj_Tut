class PostGetAllController {
    constructor(API, $log, $rootScope) {
        'ngInject';
        this.API = API;
        this.$log = $log;
        this.$rootScope = $rootScope;
        //
    }

    $onInit() {
        this.API.all('posts').get('').then((response) => {
            this.$log.log(response.data.posts);
            //  this.ToastService.show('Post listed successfully');
            this.$rootScope.events = response.data.posts;
        });
    }
}

export const PostGetAllComponent = {
    templateUrl: './views/app/components/post_get_all/post_get_all.component.html',
    controller: PostGetAllController,
    controllerAs: 'vm',
    bindings: {}
}
