angular.module('starter', ['ionic', 'controllers', 'services', 'filters'])

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
            /* SplashScreen */
            setTimeout(function() {
                navigator.splashscreen.hide();
            }, 2000);
        });
    })

    .config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider

            .state('app', {
                url: "/app",
                abstract: true,
                templateUrl: "templates/menu.html"
            })

            .state('app.home', {
                url: "/home",
                views: {
                    'menuContent' :{
                        templateUrl: "templates/home.html"
                    }
                }
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/home');

    });

