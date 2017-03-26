class UsersController{
    constructor(API, ToastService, $state,$log){
        'ngInject';

        this.API = API;
        this.$state = $state;
        this.ToastService = ToastService;
        this.user = null;
        this.$log = $log;

    }

    findOneUser(){
        let id = this.$state.params.id;

        this.API.all('users/'+id).get('').then((response) => {
            this.user = response;
            this.$log.log(response);
        });
    }

    findAllUsers(){
        this.API.all('users').get('').then((response) => {
           // this.user = response;
            this.$log.log(response);
        });
    }

    findMe(){
        this.API.all('users/self').get('').then((response) => {
             this.user = response.data.user;
             this.$log.log(response);
        });
    }



    $onInit(){

        switch(this.$state.$current.self.name){
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


        this.$scope.arrayData = [
            {src: 'http://www.francetvinfo.fr/image/75e490efj-61bb/260/146/12104700.jpg'},
            {src: 'http://www.francetvinfo.fr/image/75e490efj-61bb/260/146/12104700.jpg'},
            {src: 'http://www.francetvinfo.fr/image/75e490efj-61bb/260/146/12104700.jpg'}
        ];

        this.$log.log(this.$scope.arrayData);

        this.$scope.slideIndex = 1;
        $("#slider").slick();

    }



}

export const UsersComponent = {
    templateUrl: './views/app/components/users/users.component.html',
    controller: UsersController,
    controllerAs: 'vm',
    bindings: {}
}
