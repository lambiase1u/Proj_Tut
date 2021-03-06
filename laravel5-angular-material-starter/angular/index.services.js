import {UserService} from './services/User.service';
import {CategoryService} from './services/Category.service';
import {EventService} from './services/Event.service';
import {APIService} from './services/API.service';
import {DialogService} from './services/dialog.service';
import {ToastService} from './services/toast.service';

angular.module('app.services')
	.service('UserService', UserService)
	.service('CategoryService', CategoryService)
	.service('EventService', EventService)
	.service('API', APIService)
	.service('DialogService', DialogService)
	.service('ToastService', ToastService)
