import {PostGetAllComponent} from './app/components/post_get_all/post_get_all.component';
import {ResetPasswordComponent} from './app/components/reset-password/reset-password.component';
import {ForgotPasswordComponent} from './app/components/forgot-password/forgot-password.component';
import {LoginFormComponent} from './app/components/login-form/login-form.component';
import {RegisterFormComponent} from './app/components/register-form/register-form.component';
import {CreatePostFormComponent} from './app/components/create_post_form/create_post_form.component';


angular.module('app.components')
	.component('postGetAll', PostGetAllComponent)
	.component('resetPassword', ResetPasswordComponent)
	.component('forgotPassword', ForgotPasswordComponent)
	.component('loginForm', LoginFormComponent)
	.component('registerForm', RegisterFormComponent)
	.component('createPostForm', CreatePostFormComponent);

