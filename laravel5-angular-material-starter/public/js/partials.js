(function(module) {
try {
  module = angular.module('app.partials');
} catch (e) {
  module = angular.module('app.partials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('./views/app/components/create_post_form/create_post_form.component.html',
    '<form ng-submit="vm.submit()" enctype="multipart/form-data">\n' +
    '\n' +
    '    <md-input-container>\n' +
    '        <label>Name</label>\n' +
    '        <input type="text" ng-model="vm.name">\n' +
    '    </md-input-container>\n' +
    '\n' +
    '    <md-input-container>\n' +
    '        <label>Topic</label>\n' +
    '        <input type="text" ng-model="vm.topic">\n' +
    '    </md-input-container>\n' +
    '\n' +
    '    <md-input-container>\n' +
    '        <input id="img" multiple type="file" ng-model="vm.img"/>\n' +
    '    </md-input-container>\n' +
    '\n' +
    '    <md-button type="submit" class="md-primary md-raised">Create post</md-button>\n' +
    '\n' +
    '</form>');
}]);
})();

(function(module) {
try {
  module = angular.module('app.partials');
} catch (e) {
  module = angular.module('app.partials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('./views/app/components/eventForm/eventForm.component.html',
    '<form ng-submit="event.submit()" enctype="multipart/form-data" name="eventForm">\n' +
    '\n' +
    '    <div>\n' +
    '        <md-input-container>\n' +
    '            <label>title</label>\n' +
    '            <input type="text" ng-model="event.title">\n' +
    '        </md-input-container>\n' +
    '    </div>\n' +
    '\n' +
    '    <div>\n' +
    '        <md-input-container class="">\n' +
    '            <label>Date</label>\n' +
    '            <md-datepicker ng-model="event.date" md-placeholder="dd/mm/yyyy" md-open-on-focus></md-datepicker>\n' +
    '        </md-input-container>\n' +
    '    </div>\n' +
    '\n' +
    '    <div>\n' +
    '        <md-input-container class="md-block" flex-gt-sm>\n' +
    '            <label>Max people</label>\n' +
    '            <input name="capacity" ng-model="event.capacity" placeholder="123" md-maxlength="5">\n' +
    '        </md-input-container>\n' +
    '    </div>\n' +
    '\n' +
    '\n' +
    '    <div>\n' +
    '        <md-input-container class="md-block">\n' +
    '            <label>Description</label>\n' +
    '            <textarea ng-model="event.description" md-maxlength="150" rows="5" md-select-on-focus></textarea>\n' +
    '        </md-input-container>\n' +
    '    </div>\n' +
    '\n' +
    '\n' +
    '    <div>\n' +
    '        <md-input-container>\n' +
    '            <md-checkbox aria-label="Public" ng-model="event.public" class="md-primary">\n' +
    '                Public\n' +
    '            </md-checkbox>\n' +
    '        </md-input-container>\n' +
    '    </div>\n' +
    '\n' +
    '    <!--\n' +
    '    <div>\n' +
    '        <md-input-container>\n' +
    '            <label>Category</label>\n' +
    '            <md-select ng-model="event.idCategorie" md-selected-text="getSelectedText()">\n' +
    '                <md-optgroup label="Category">\n' +
    '                    <md-option ng-value="category" ng-repeat="category in event.categories">Item {{category}}\n' +
    '                    </md-option>\n' +
    '                </md-optgroup>\n' +
    '            </md-select>\n' +
    '        </md-input-container>\n' +
    '    </div>\n' +
    '\n' +
    '    <div>\n' +
    '        <md-input-container>\n' +
    '            <label>placeId</label>\n' +
    '            <md-select ng-model="event.placeId" md-selected-text="getSelectedText()">\n' +
    '                <md-optgroup label="Category">\n' +
    '                    <md-option ng-value="place" ng-repeat="place in event.places">Item {{place}}</md-option>\n' +
    '                </md-optgroup>\n' +
    '            </md-select>\n' +
    '        </md-input-container>\n' +
    '    </div>\n' +
    '\n' +
    '    <div>\n' +
    '        <md-input-container>\n' +
    '            <label>Link to another event :</label>\n' +
    '            <input ng-model="event.idParent" type="text">\n' +
    '        </md-input-container>\n' +
    '    </div>\n' +
    '    -->\n' +
    '\n' +
    '    <md-button type="submit" class="md-primary md-raised">Create post</md-button>\n' +
    '\n' +
    '</form>');
}]);
})();

(function(module) {
try {
  module = angular.module('app.partials');
} catch (e) {
  module = angular.module('app.partials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('./views/app/components/forgot-password/forgot-password.component.html',
    '<form ng-submit="vm.submit()" class="ForgotPassword-form">\n' +
    '    <div>\n' +
    '        <md-input-container>\n' +
    '            <label>Email</label>\n' +
    '            <input type="email" ng-model="vm.email">\n' +
    '        </md-input-container>\n' +
    '\n' +
    '        <md-button type="submit" class="md-primary md-raised">Submit</md-button>\n' +
    '    </div>\n' +
    '</form>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('app.partials');
} catch (e) {
  module = angular.module('app.partials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('./views/app/components/login-form/login-form.component.html',
    '<form ng-submit="vm.login()">\n' +
    '	<div>\n' +
    '		<md-input-container class="LoginForm-inputContainer">\n' +
    '			<label>Email</label>\n' +
    '			<input type="email" ng-model="vm.email">\n' +
    '		</md-input-container>\n' +
    '	</div>\n' +
    '\n' +
    '	<div>\n' +
    '		<md-input-container class="LoginForm-inputContainer">\n' +
    '			<label>Password</label>\n' +
    '			<input type="password" ng-model="vm.password">\n' +
    '		</md-input-container>\n' +
    '	</div>\n' +
    '\n' +
    '	<md-button type="submit" class="LoginForm-submit md-primary md-raised">Log in</md-button>\n' +
    '</form>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('app.partials');
} catch (e) {
  module = angular.module('app.partials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('./views/app/components/post_get_all/post_get_all.component.html',
    '<section layout="row" flex>\n' +
    '\n' +
    '    <md-sidenav\n' +
    '            class="md-sidenav-left"\n' +
    '            md-component-id="left"\n' +
    '            md-is-locked-open="$mdMedia(\'gt-md\')"\n' +
    '            md-whiteframe="4">\n' +
    '\n' +
    '        <md-toolbar class="md-theme-indigo">\n' +
    '            <h1 class="md-toolbar-tools">Sidenav Left</h1>\n' +
    '        </md-toolbar>\n' +
    '        <md-content layout-padding >\n' +
    '\n' +
    '            <md-input-container class="md-block">\n' +
    '                <input id="autocomplete" type="text" ng-model="test.address">\n' +
    '            </md-input-container>\n' +
    '\n' +
    '            <md-button ng-click="close()" class="md-primary" hide-gt-md>\n' +
    '                Close Sidenav Left\n' +
    '            </md-button>\n' +
    '            <p hide show-gt-md>\n' +
    '                This sidenav is locked open on your device. To go back to the default behavior,\n' +
    '                narrow your display.\n' +
    '            </p>\n' +
    '\n' +
    '            <md-list>\n' +
    '                <md-list-item class="md-3-line" ng-repeat="item in events">\n' +
    '                    <img ng-src="{{item.face}}?{{$index}}" class="md-avatar" alt="{{item.who}}">\n' +
    '                    <div class="md-list-item-text">\n' +
    '                        <h3>{{item.name}}</h3>\n' +
    '                        <h4>{{item.topic}}</h4>\n' +
    '                        <p>{{item.created_at}}</p>\n' +
    '                    </div>\n' +
    '                    <md-divider md-inset ng-if="!$last"></md-divider>\n' +
    '                </md-list-item>\n' +
    '            </md-list>\n' +
    '        </md-content>\n' +
    '\n' +
    '    </md-sidenav>\n' +
    '\n' +
    '    <md-content flex layout-padding  style="overflow: hidden;">\n' +
    '        <div id="map" style="min-height: 100%; width: 100%;">\n' +
    '\n' +
    '        </div>\n' +
    '\n' +
    '    </md-content>\n' +
    '</section>\n' +
    '\n' +
    '\n' +
    '\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('app.partials');
} catch (e) {
  module = angular.module('app.partials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('./views/app/components/register-form/register-form.component.html',
    '<form ng-submit="vm.register()">\n' +
    '\n' +
    '    <div>\n' +
    '        <md-input-container class="RegisterForm-inputContainer">\n' +
    '            <label>Birthday</label>\n' +
    '            <md-datepicker ng-model="vm.birthdate"  md-current-view="year"  md-placeholder="dd/mm/yyyy"></md-datepicker>\n' +
    '        </md-input-container>\n' +
    '    </div>\n' +
    '\n' +
    '    <div>\n' +
    '        <md-input-container class="RegisterForm-inputContainer">\n' +
    '            <label>Name</label>\n' +
    '            <input type="text" ng-model="vm.name">\n' +
    '        </md-input-container>\n' +
    '    </div>\n' +
    '\n' +
    '    <div>\n' +
    '        <md-input-container class="RegisterForm-inputContainer">\n' +
    '            <label>firstName</label>\n' +
    '            <input type="text" ng-model="vm.firstName">\n' +
    '        </md-input-container>\n' +
    '    </div>\n' +
    '\n' +
    '\n' +
    '    <div>\n' +
    '        <md-input-container class="RegisterForm-inputContainer">\n' +
    '            <label>Email</label>\n' +
    '            <input type="email" ng-model="vm.email">\n' +
    '        </md-input-container>\n' +
    '    </div>\n' +
    '\n' +
    '    <div>\n' +
    '        <md-input-container class="RegisterForm-inputContainer">\n' +
    '            <label>Password</label>\n' +
    '            <input type="password" ng-model="vm.password">\n' +
    '        </md-input-container>\n' +
    '    </div>\n' +
    '\n' +
    '    <md-button type="submit" class="RegisterForm-submit md-primary md-raised">Register</md-button>\n' +
    '</form>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('app.partials');
} catch (e) {
  module = angular.module('app.partials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('./views/app/components/reset-password/reset-password.component.html',
    '<form ng-submit="vm.submit()">\n' +
    '\n' +
    '    <div ng-if="!vm.isValidToken" layout="row" layout-align="center center">\n' +
    '        <md-progress-circular md-mode="indeterminate"></md-progress-circular>\n' +
    '    </div>\n' +
    '\n' +
    '    <div ng-show="vm.isValidToken">\n' +
    '        <md-input-container class="ResetPassword-input">\n' +
    '            <label>Password</label>\n' +
    '            <input type="password" ng-model="vm.password">\n' +
    '        </md-input-container>\n' +
    '\n' +
    '        <md-input-container class="ResetPassword-input">\n' +
    '            <label>Confirm Password</label>\n' +
    '            <input type="password" ng-model="vm.password_confirmation">\n' +
    '        </md-input-container>\n' +
    '\n' +
    '        <md-button type="submit" class="md-primary md-raised">Submit</md-button>\n' +
    '    </div>\n' +
    '\n' +
    '</form>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('app.partials');
} catch (e) {
  module = angular.module('app.partials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('./views/app/pages/create_post/create_post.page.html',
    '<md-content class="Page-container">\n' +
    '\n' +
    '    <div class="Login-formContainer" layout="column" layout-align="center center">\n' +
    '        <h1>Create Post</h1>\n' +
    '\n' +
    '        <create-post-form></create-post-form>\n' +
    '    </div>\n' +
    '</md-content>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('app.partials');
} catch (e) {
  module = angular.module('app.partials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('./views/app/pages/event/event.page.html',
    '<md-content class="Page-container">\n' +
    '    <div flex="80" flex-offset="10">\n' +
    '        <div class="Register-formContainer" layout="column" layout-align="center center">\n' +
    '            <h1 class="md-headline">Create an Event</h1>\n' +
    '\n' +
    '            <event-form></event-form>\n' +
    '\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</md-content>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('app.partials');
} catch (e) {
  module = angular.module('app.partials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('./views/app/pages/footer/footer.page.html',
    '<md-content class="Page-Container Footer iOS-hack" layout-align="center center">\n' +
    '<md-icon md-svg-src="/img/icons/logo-grey.svg" class="Footer-logo"></md-icon>\n' +
    '<br/>\n' +
    '<br/>\n' +
    '<div class="Footer-text">\n' +
    '	Un projet fait par Dylan Demougin, Quentin Claudel, David Lambiase et Maxime Weiten dans le cadre d\'un projet tutoré à l\'<a href="http://iut-charlemagne.univ-lorraine.fr" class="Footer-link" target="_blank">IUT Charlemagne</a> de Nancy.\n' +
    '</div>\n' +
    '</md-content>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('app.partials');
} catch (e) {
  module = angular.module('app.partials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('./views/app/pages/forgot-password/forgot-password.page.html',
    '<md-content class="Page-container">\n' +
    '    <div class="ForgotPassword-formContainer" layout="column" layout-align="center center">\n' +
    '\n' +
    '        <h1 class="md-headline">Forgot your password?</h1>\n' +
    '\n' +
    '        <forgot-password></forgot-password>\n' +
    '\n' +
    '    </div>\n' +
    '</md-content>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('app.partials');
} catch (e) {
  module = angular.module('app.partials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('./views/app/pages/header/header.page.html',
    '<md-content class="Page-Container DemoHeader">\n' +
    '	<div layout="row">\n' +
    '		<div flex="90" flex-offset="5" class="DemoHeader-container">\n' +
    '			<div layout="row" layout-align="space-between">\n' +
    '				<img src="img/icons/logo.svg" ui-sref="app.landing" class="DemoHeader-logo"/>\n' +
    '				<div layout="row" layout-align="center stretch">\n' +
    '					<a hide-xs class="DemoHeader-link md-subhead" href="#!/register">Inscription</a>\n' +
    '					<a hide-xs class="DemoHeader-link md-subhead" href="#!/login">Connexion</a>\n' +
    '					<a hide-xs class="DemoHeader-link md-subhead" href="https://github.com/lambiase1u/Proj_Tut" target="_blank">Github</a>\n' +
    '				</div>\n' +
    '			</div>\n' +
    '		</div>\n' +
    '	</div>\n' +
    '</md-content>\n' +
    '<div class="DemoHeader-spacer"></div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('app.partials');
} catch (e) {
  module = angular.module('app.partials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('./views/app/pages/landing/landing.page.html',
    '<div class="Page-Container Landing iOS-hack">\n' +
    '    \n' +
    '</div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('app.partials');
} catch (e) {
  module = angular.module('app.partials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('./views/app/pages/login/login.page.html',
    '<md-content class="Page-container">\n' +
    '    <div class="Login-formContainer" layout="column" layout-align="center center">\n' +
    '\n' +
    '        <h1 class="md-headline">Log in to your account</h1>\n' +
    '\n' +
    '        <login-form></login-form>\n' +
    '\n' +
    '    </div>\n' +
    '</md-content>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('app.partials');
} catch (e) {
  module = angular.module('app.partials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('./views/app/pages/post_get_all/post_get_all.page.html',
    '<md-content class="Page-container">\n' +
    '\n' +
    '    <post-get-all></post-get-all>\n' +
    '</md-content>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('app.partials');
} catch (e) {
  module = angular.module('app.partials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('./views/app/pages/register/register.page.html',
    '<md-content class="Page-container">\n' +
    '	<div flex="80" flex-offset="10">\n' +
    '		<div class="Register-formContainer" layout="column" layout-align="center center">\n' +
    '			<h1 class="md-headline">Create an account</h1>\n' +
    '\n' +
    '			<register-form></register-form>\n' +
    '\n' +
    '		</div>\n' +
    '	</div>\n' +
    '</md-content>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('app.partials');
} catch (e) {
  module = angular.module('app.partials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('./views/app/pages/reset-password/reset-password.page.html',
    '<md-content class="Page-container">\n' +
    '    <div class="ResetPassword-formContainer" layout="column" layout-align="center center">\n' +
    '\n' +
    '        <h1 class="md-headline">Reset Password</h1>\n' +
    '\n' +
    '        <reset-password></reset-password>\n' +
    '\n' +
    '    </div>\n' +
    '</md-content>\n' +
    '');
}]);
})();
