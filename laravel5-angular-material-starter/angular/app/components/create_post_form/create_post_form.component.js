class CreatePostFormController {
    constructor(API, ToastService, $log) {
        'ngInject';

        this.API = API;
        this.ToastService = ToastService;
        this.$log = $log;
    }

    submit() {
        var data = {
            name: this.name,
            topic: this.topic
        };

        this.API.all('posts').post(data).then((response) => {
            this.$log.log(response);
            this.ToastService.show('Post added successfully');
        });
    }
}

export const CreatePostFormComponent = {
    templateUrl: './views/app/components/create_post_form/create_post_form.component.html',
    controller: CreatePostFormController,
    controllerAs: 'vm',
    bindings: {}
};