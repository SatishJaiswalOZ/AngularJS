'use strict';

angular.module('app', ['ngCookies', 'ui.router', 'app.filters', 'app.services', 'app.directives', 'app.controllers'])

    // Gets executed during the provider registrations and configuration phase. Only providers and constants can be
    // injected here. This is to prevent accidental instantiation of services before they have been fully configured.
    .config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: '/views/index',
                controller: 'HomeCtrl as vm'
            })
            .state('about', {
                url: '/about',
                templateUrl: '/views/about',
                controller: 'AboutCtrl'
            })
            .state('contacts', {
                url: '/contacts',
                templateUrl: '/views/contacts',
                controller: 'ContactsCtrl'
            })
            .state('login', {
                url: '/login',
                layout: 'basic',
                templateUrl: '/views/login',
                controller: 'LoginCtrl as vm'
            })
              .state('register', {
                  url: '/register',
                  layout: 'basic',
                  templateUrl: '/views/register',
                  controller: 'RegisterCtrl as vm'
              })
            .state('otherwise', {
                url: '*path',
                templateUrl: '/views/index',
                controller: 'HomeCtrl as vm'
            });
        $locationProvider.html5Mode(true);
    }])

    // Gets executed after the injector is created and are used to kickstart the application. Only instances and constants
    // can be injected here. This is to prevent further system configuration during application run time.
        .run(['$templateCache', '$rootScope', '$state', '$stateParams', '$cookieStore', '$location', function ($templateCache, $rootScope, $state, $stateParams, $cookieStore, $location) {

            // <ui-view> contains a pre-rendered template for the current view
            // caching it will prevent a round-trip to a server at the first page load
            var view = angular.element('#ui-view');
            $templateCache.put(view.data('tmpl-url'), view.html());

            // Allows to retrieve UI Router state information from inside templates
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;

            $rootScope.$on('$stateChangeSuccess', function (event, toState) {

                // Sets the layout name, which can be used to display different layouts (header, footer etc.)
                // based on which page the user is located
                $rootScope.layout = toState.layout;
            });

            //// keep user logged in after page refresh
            $rootScope.globals = $cookieStore.get('globals') || {};
            if ($rootScope.globals.currentUser) {
                $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
            }

            $rootScope.$on('$locationChangeStart', function (event, next, current) {
                // redirect to login page if not logged in and trying to access a restricted page
                var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
                var loggedIn = $rootScope.globals.currentUser;
                if (restrictedPage && !loggedIn) {
                    $location.path('/login');
                }
            });
        }]);