angular.module('starter', ['ionic', 'controllers', 'services'])

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

    /*
     Config
     */
    .constant('config', {
        apiUrl          : 'http://api.whoareyou.io',
        token           : 'KDR8u9vuRH8i6hx8V4e6',
        facebookAppApi  : '828582677192624',
        currentCategory : 'badboy',
        overlay         : false
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

    })

    /*
     * Seed private Token to WAY API
     */
    .config(function($httpProvider, config){
        // Enable Cache for $http request
        $httpProvider.defaults.cache = true;
        // Add token for $http request
        $httpProvider.defaults.headers.common['Auth-Token'] = config.token;
    });

