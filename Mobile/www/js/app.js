angular.module('starter', ['ionic', 'controllers', 'services', 'filters'])

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    })

    .config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('tab', {
                url        : "/tab",
                abstract   : true,
                templateUrl: "templates/tabs.html"
            })

            .state('tab.home', {
                url  : '/home',
                views: {
                    'tab-home': {
                        templateUrl: 'templates/tab-home.html'
                    }
                }
            })
            .state('tab.connexion', {
                url  : '/connexion',
                views: {
                    'tab-connexion': {
                        templateUrl: 'templates/tab-connexion.html'
                    }
                }
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/tab/home');

    });

