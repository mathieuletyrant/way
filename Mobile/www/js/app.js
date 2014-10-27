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

    /*
     Config
     */
    .constant('config', {
        apiUrl          : 'http://wayapi.mathieuletyrant.com',
        token           : 'KDR8u9vuRH8i6hx8V4e6',
        facebookAppApi  : '828582677192624', // TODO Need change when we have good key from Facebook :)
        currentCategory : 'geek'
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
            })

            .state('app.connexion', {
                url: "/connexion",
                views: {
                    'menuContent' :{
                        templateUrl: "templates/connexion.html"
                    }
                }
            })
            .state('app.gooddeal', {
                url: "/gooddeal/:id",
                views: {
                    'menuContent' :{
                        templateUrl: "templates/gooddeal.html"
                    }
                }
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/connexion');

    });

