import {EventContentComponent} from './app/components/eventContent/eventContent.component';
import {UpdateUserComponent} from './app/components/update_user/update_user.component';
import {EventsComponent} from './app/components/events/events.component';
import {HeaderComponent} from './app/components/header/header.component';
import {UsersComponent} from './app/components/users/users.component';
import {EventFormComponent} from './app/components/eventForm/eventForm.component';
import {PostGetAllComponent} from './app/components/post_get_all/post_get_all.component';
import {ResetPasswordComponent} from './app/components/reset-password/reset-password.component';
import {ForgotPasswordComponent} from './app/components/forgot-password/forgot-password.component';
import {LoginFormComponent} from './app/components/login-form/login-form.component';
import {RegisterFormComponent} from './app/components/register-form/register-form.component';
import {CreatePostFormComponent} from './app/components/create_post_form/create_post_form.component';


angular.module('app.components')
	.component('eventContent', EventContentComponent)
	.component('updateUser', UpdateUserComponent)
	.component('events', EventsComponent)
	.component('header', HeaderComponent)
	.component('users', UsersComponent)
	.component('eventForm', EventFormComponent)
	.component('postGetAll', PostGetAllComponent)
	.component('resetPassword', ResetPasswordComponent)
	.component('forgotPassword', ForgotPasswordComponent)
	.component('loginForm', LoginFormComponent)
	.component('registerForm', RegisterFormComponent)
	.component('createPostForm', CreatePostFormComponent);

