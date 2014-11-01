angular.module('starter', ['ionic', 'controllers', 'services', 'filters', 'ngMap'])

    /*
     Config
     */
    .constant('config', {
        apiUrl          : 'http://wayapi.mathieuletyrant.com',
        token           : 'KDR8u9vuRH8i6hx8V4e6',
        facebookAppApi  : '828582677192624',
        currentCategory : 'geek',
        overlay         : false,
        device          : ''
    })

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
                console.log('Splashscreen Hide');
            }, 20000);
            console.log('Application Started');
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
        $urlRouterProvider.otherwise('/app/home');

    });

