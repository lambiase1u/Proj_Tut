class LoginFormController {
	constructor($auth, ToastService , $state,$rootScope) {
		'ngInject';

		this.$auth = $auth;
		this.ToastService = ToastService;
        this.$state = $state;
		this.$rootScope = $rootScope;
	}

    $onInit(){
        this.email = '';
        this.password = '';
    }

	login() {
		let user = {
			email: this.email,
			password: this.password
		};

		this.$auth.login(user)
			.then((response) => {
				this.$auth.setToken(response.data);

				this.$rootScope.user = response.data.data.user;


				this.ToastService.show('Connexion réussie.');
                return this.$state.go('app.create_post');
			})
			.catch(this.failedLogin.bind(this));
	}

	failedLogin(response) {
		if (response.status === 422) {
			for (let error in response.data.errors) {
				return this.ToastService.error(response.data.errors[error][0]);
			}
		}
		this.ToastService.error(response.statusText);
	}
}

export const LoginFormComponent = {
	templateUrl: './views/app/components/login-form/login-form.component.html',
	controller: LoginFormController,
	controllerAs: 'vm',
	bindings: {}
}
