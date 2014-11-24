'use strict';

angular.module('app', ['ui.router', 'facebook', 'ngStorage', 'ngAnimate', 'ngAria'])

    /*
        Config
     */
    .constant('config', {
        path                    : '/Web',
        apiUrl                  : 'http://wayapi.mathieuletyrant.com',
        token                   : 'KDR8u9vuRH8i6hx8V4e6',
        facebookAppApi          : '828582677192624',
        intervalNotification    : 5,
        timeMusic               : 15,
        antiFlood               : 30,
        overlay                 : false
    })

    /*
        Route System
     */
    .config(function($stateProvider, $urlRouterProvider, $locationProvider){

        $urlRouterProvider.otherwise("/home"); // Default Page

        // TODO Enable in production
        //$locationProvider.html5Mode(true);
        //$locationProvider.hashPrefix('!');

        $stateProvider
            .state('home', {
                url: "/home",
                templateUrl: 'templates/home.html'
            })
            .state('letgo', {
                url: "/letgo",
                templateUrl: 'templates/letgo.html'
            })
            .state('defi', {
                url: "/defi/:user_1/:user_2/:category/:status",
                templateUrl: 'templates/defi.html'
            })
            .state('profil', {
                url: "/profil",
                templateUrl: 'templates/profil.html'
            })
            .state('quizz', {
                url: "/quizz/:type/:user_1/:user_2/:category/:blindId",
                templateUrl: 'templates/quizz.html'
            })
            .state('choose', {
                url: "/choose",
                templateUrl: 'templates/choose.html'
            });
    })

    /*
        Facebook Connect
     */
    .config(function(FacebookProvider, config) {
        FacebookProvider.init(config.facebookAppApi);
    })

    /*
     * Seed private Token to WAY API
     */
    .config(function($httpProvider, config){
        $httpProvider.defaults.headers.common['Auth-Token'] = config.token;
    });