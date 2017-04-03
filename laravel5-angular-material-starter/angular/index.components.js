import {PresentationHomeComponent} from './app/components/presentation-home/presentation-home.component';
import {BannerHomeComponent} from './app/components/banner-home/banner-home.component';
import {DateComponent} from './app/components/date/date.component';
import {EventContentComponent} from './app/components/eventContent/eventContent.component';
import {HeaderComponent} from './app/components/header/header.component';
import {UsersComponent} from './app/components/users/users.component';
import {EventFormComponent} from './app/components/eventForm/eventForm.component';
import {ResetPasswordComponent} from './app/components/reset-password/reset-password.component';
import {ForgotPasswordComponent} from './app/components/forgot-password/forgot-password.component';
import {LoginFormComponent} from './app/components/login-form/login-form.component';
import {RegisterFormComponent} from './app/components/register-form/register-form.component';


angular.module('app.components')
	.component('presentationHome', PresentationHomeComponent)
	.component('bannerHome', BannerHomeComponent)
	.component('date', DateComponent)
	.component('eventContent', EventContentComponent)
	.component('header', HeaderComponent)
	.component('users', UsersComponent)
	.component('eventForm', EventFormComponent)
	.component('resetPassword', ResetPasswordComponent)
	.component('forgotPassword', ForgotPasswordComponent)
	.component('loginForm', LoginFormComponent)
	.component('registerForm', RegisterFormComponent)

