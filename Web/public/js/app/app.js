'use strict';

angular.module('app', ['ui.router', 'facebook', 'ngStorage', 'ngAnimate'])

    /*
        Config
     */
    .constant('config', {
        apiUrl                  : 'http://wayapi.mathieuletyrant.com',
        token                   : 'KDR8u9vuRH8i6hx8V4e6',
        facebookAppApi          : '828582677192624',
        intervalNotification    : 1,
        overlay                 : false
    })

    /*
        Route System
     */
    .config(function($stateProvider, $urlRouterProvider){

        $urlRouterProvider.otherwise("/home"); // Default Page

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
                url: "/defi",
                templateUrl: 'templates/defi.html'
            })
            .state('profil', {
                url: "/profil",
                templateUrl: 'templates/profil.html'
            })
            .state('quizz', {
                url: "/quizz/:type",
                templateUrl: 'templates/quizz.html'
            });
    })

    /*
        Facebook Connect
     */
    .config(function(FacebookProvider, config) {
        FacebookProvider.init(config.facebookAppApi);
    });