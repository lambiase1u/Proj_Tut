export function RoutesConfig($stateProvider, $urlRouterProvider) {
	'ngInject';

	let getView = (viewName) => {
		return `./views/app/pages/${viewName}/${viewName}.page.html`;
	};

	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('app', {
			abstract: true,
            data: {},//{auth: true} would require JWT auth
			views: {
				header: {
					templateUrl: getView('header')
				},
				footer: {
					templateUrl: getView('footer')
				},
				main: {}
			}
		})
		.state('app.landing', {
            url: '/',
            views: {
                'main@': {
                    templateUrl: getView('landing')
                }
            }
        })
        .state('app.login', {
			url: '/login',
            redirectTo: 'app.create_post',
			views: {
				'main@': {
					templateUrl: getView('login')
				}
			}
		})
        .state('app.register', {
            url: '/register',
            views: {
                'main@': {
                    templateUrl: getView('register')
                }
            }
        })
        .state('app.users_id', {
            url: '/users/:id',
            views: {
                'main@': {
                    templateUrl: getView('users')
                }
            }
        })
        .state('app.users_me', {
        url: '/self',
        views: {
            'main@': {
                templateUrl: getView('users') //???
            }
        }
        })
        .state('app.users_all', {
            url: '/users/all',
            views: {
                'main@': {
                    templateUrl: getView('users') //???
                }
            }
        })
        .state('app.forgot_password', {
            url: '/forgot-password',
            views: {
                'main@': {
                    templateUrl: getView('forgot-password')
                }
            }
        })
        .state('app.reset_password', {
            url: '/reset-password/:email/:token',
            views: {
                'main@': {
                    templateUrl: getView('reset-password')
                }
            }
        })
        .state('app.create_post', {
            url: '/create-post',
            data: {auth: true},//{auth: true} would require JWT auth
            views: {
                'main@': {
                    templateUrl: getView('create_post')
                }
            }
        })
        .state('app.get_all_posts', {
            url: '/posts',
            data: {auth: true},//{auth: true} would require JWT auth
            views: {
                'main@': {
                    templateUrl: getView('post_get_all')
                }
            }
        })
        .state('app.event', {
            url: '/event/create',
            data: {auth: true},//{auth: true} would require JWT auth
            views: {
                'main@': {
                    templateUrl: getView('event')
                }
            }
        });
}
