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
  $templateCache.put('./views/app/pages/footer/footer.page.html',
    '<md-content class="Page-Container Footer iOS-hack" layout-align="center center">\n' +
    '<md-icon md-svg-src="/img/icons/logo-grey.svg" class="Footer-logo"></md-icon>\n' +
    '<br/>\n' +
    '<br/>\n' +
    '<div class="Footer-text">\n' +
    '	An open source project by <a href="https://github.com/jadjoubran" class="Footer-link" target="_blank">Jad Joubran</a>.\n' +
    '	Design by <a href="http://nicolesaidy.com" class="Footer-link" target="_blank">Nicole Saidy</a>\n' +
    '</div>\n' +
    '<div class="Footer-text">\n' +
    '	&copy; 2016 Laravel Angular Material Starter\n' +
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
    '					<a hide-xs class="DemoHeader-link md-subhead" href="https://laravel-angular.readme.io" target="_blank">Docs</a>\n' +
    '					<a hide-xs class="DemoHeader-link md-subhead" href="https://www.youtube.com/watch?list=PLIiQ4B5FSupiQYLX6kERPV0OhMC7tTbBE&v=_ZWV9KBK2N8" target="_blank">Screencasts</a>\n' +
    '					<a hide-xs class="DemoHeader-link md-subhead" href="https://github.com/jadjoubran/laravel5-angular-material-starter" target="_blank">Github</a>\n' +
    '					<iframe class="DemoHeader-github" src="https://ghbtns.com/github-btn.html?user=jadjoubran&repo=laravel5-angular-material-starter&type=star&count=true&size=large" frameborder="0" scrolling="0" width="160px" height="30px"></iframe>\n' +
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
    '    <div layout="column" class="Landing-cover" layout-align="center center">\n' +
    '        <div class="md-headline Landing-subtitle">Build your next powerful web app</div>\n' +
    '        <h1 class="md-display-3 Landing-heading"><strong>laravel angular</strong> <span class="Landing-headingLight">material starter</span></h1>\n' +
    '        <md-button class="md-raised md-large Landing-getStarted" href="https://laravel-angular.readme.io/docs/install" target="_blank">Get Started</md-button>\n' +
    '    </div>\n' +
    '\n' +
    '    <div class="Landing-laravelAngular">\n' +
    '        <div class="Landing-ampersand" hide show-gt-sm>&amp;</div>\n' +
    '        <div layout="column" layout-gt-sm="row">\n' +
    '            <div flex="50" class="Landing-laravel" layout-align="center center">\n' +
    '                <h2 class="md-display-2 Landing-laravelAngular-title">Laravel</h2>\n' +
    '                <div class="md-title Landing-laravelAngular-subtitle">Response macros integrated with your Angular app</div>\n' +
    '                <br/>\n' +
    '                <div class="DemoCode">\n' +
    '                    <span class="DemoCode-operator">&lt;?php</span><br/>\n' +
    '                    <br/>\n' +
    '                    <span class="DemoCode-highlight">class</span> <span class="DemoCode-secondary">PostsController</span><br/>\n' +
    '                    {<br/>\n' +
    '                    <br/>\n' +
    '                    &nbsp;&nbsp;&nbsp;&nbsp;public <span class="DemoCode-secondary">function</span> <span class="DemoCode-highlight">get</span>()<br/>\n' +
    '                    &nbsp;&nbsp;&nbsp;&nbsp;{<br/>\n' +
    '                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="DemoCode-secondary">$posts</span> = <span class="DemoCode-highlight">App</span>\\<span class="DemoCode-highlight">Post</span>::<span class="DemoCode-secondary">get</span>();<br/>\n' +
    '                    <br/>\n' +
    '                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="DemoCode-highlight">return</span> <span class="DemoCode-secondary">response</span>()<br/>\n' +
    '                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&gt;<span class="DemoCode-secondary">success</span>(compact(<span class="DemoCode-string">\'posts\'</span>));<br/>\n' +
    '                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>\n' +
    '                    }\n' +
    '                    <br/>\n' +
    '                    <br/>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            <div flex="50" class="Landing-angular" layout-align="center center">\n' +
    '                <h2 class="md-display-2 Landing-laravelAngular-title">Angular</h2>\n' +
    '                <div class="md-title Landing-laravelAngular-subtitle">Query your API without worrying about validations</div>\n' +
    '                <br/>\n' +
    '                <div class="DemoCode">\n' +
    '                    <span class="DemoCode-secondary">Class</span> <span class="DemoCode-highlight">PostsController</span> {<br/>\n' +
    '                    &nbsp;&nbsp;&nbsp;&nbsp;<span class="DemoCode-highlight">constructor</span>(API){<br/>\n' +
    '                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="DemoCode-string">\'ngInject\'</span>;<br/>\n' +
    '                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this.API = API<br/>\n' +
    '                    &nbsp;&nbsp;&nbsp;&nbsp;}<br/>\n' +
    '                    <br/>\n' +
    '                    &nbsp;&nbsp;&nbsp;&nbsp;<span class="DemoCode-highlight">getPosts</span>(){<br/>\n' +
    '                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this.API.all(<span class="DemoCode-string">\'posts\'</span>).get(\'\')<br/>\n' +
    '                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.then((<span class="DemoCode-secondary">response</span>) => {<br/>\n' +
    '                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="DemoCode-highlight">this</span>.posts = <span class="DemoCode-highlight">response.data</span>;<br/>\n' +
    '                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;});<br/>\n' +
    '                    &nbsp;&nbsp;&nbsp;&nbsp;}<br/>\n' +
    '                    }<br/>\n' +
    '                    <br/>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '\n' +
    '    <div class="Landing-features" layout-align="center center">\n' +
    '        <h1 class="md-display-2 Landing-featuresMainTitle">Laravel Angular Material Starter</h1>\n' +
    '        <div class="md-title Landing-featuresMainDescription">\n' +
    '            The right features to get you started\n' +
    '        </div>\n' +
    '        <br/>\n' +
    '        <div>\n' +
    '            <div layout="column" layout-gt-sm="row" layout-align="space-around">\n' +
    '                <div flex="33">\n' +
    '                    <div class="Landing-featuresEntry Landing-featuresEntry--restful">\n' +
    '                        <md-icon md-svg-src="/img/icons/restful-api.svg" class="Landing-featuresEntry-icon"></md-icon>\n' +
    '                    </div>\n' +
    '                    <div class="md-headline Landing-featuresTitle">RESTful API</div>\n' +
    '                    <div class="md-subhead Landing-featuresDescription">Build consistent REST APIs and call them fluently using JavaScript, without having to worry about validation errors</div>\n' +
    '                </div>\n' +
    '                <div flex="33">\n' +
    '                    <div class="Landing-featuresEntry Landing-featuresEntry--jwt">\n' +
    '                        <md-icon md-svg-src="/img/icons/json-webtoken.svg" class="Landing-featuresEntry-icon"></md-icon>\n' +
    '                    </div>\n' +
    '                    <div class="md-headline Landing-featuresTitle">Json Web Token Authentication</div>\n' +
    '                    <div class="md-subhead Landing-featuresDescription">Get an out-of-the-box JWT Authentication in your app that allows you to authenticate users on the fly</div>\n' +
    '                </div>\n' +
    '                <div flex="33">\n' +
    '                    <div class="Landing-featuresEntry Landing-featuresEntry--generators">\n' +
    '                        <md-icon md-svg-src="/img/icons/angular-generators.svg" class="Landing-featuresEntry-icon"></md-icon>\n' +
    '                    </div>\n' +
    '                    <div class="md-headline Landing-featuresTitle">Angular Generators</div>\n' +
    '                    <div class="md-subhead Landing-featuresDescription">Generate angular features, dialogs, directives, services, filters & configs just like you\'re used to</div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <br/>\n' +
    '        <br/>\n' +
    '    </div>\n' +
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
