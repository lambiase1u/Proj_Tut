class UsersController {
    constructor(API, ToastService, $state, $log) {
        'ngInject';

        this.API = API;
        this.$state = $state;
        this.ToastService = ToastService;
        this.user = null;
        this.$log = $log;
        this.lastParticipation =null;
        this.dataLoaded = false;

    }

    findOneUser() {
        let id = this.$state.params.id;

        this.API.all('users/' + id).get('').then((response) => {
            this.user =  response.data.user;
            this.participation();
            this.$log.log( response.data.user);
        });
    }

    findAllUsers() {
        this.API.all('users').get('').then((response) => {
            // this.user =  response.data.user;
            this.$log.log(response.data);
        });
    }

    findMe() {
        this.API.all('users/self').get('').then((response) => {
            this.user = response.data.user;
            this.$log.log( response.data.user);
            this.participation();
        });
    }

    participation(){
        this.$log.log('users/'+this.user.id+'/participe');

        let ctrl = this;

        this.API.all('users/'+this.user.id+'/participe').get('').then((response)=>{
            this.$log.log(response);
            this.lastParticipation = response;
        }).finally(function() {
            ctrl.dataLoaded = true;

        });

    }

    carouselInit(){
        console.log(this.dataLoaded);

        $timeout(function() {
            ctrl.ready = true;
        }, 1000);
       // ;
    }

    $onInit() {

        switch (this.$state.$current.self.name) {
            case "app.users_all" :
                this.findAllUsers();
                break;
            case "app.users_id" :
                this.findOneUser();
                break;
            case "app.users_me" :
                this.findMe();
                break;
        }


    }
}

export const UsersComponent = {
    templateUrl: './views/app/components/users/users.component.html',
    controller: UsersController,
    controllerAs: 'vm',
    bindings: {}
}
