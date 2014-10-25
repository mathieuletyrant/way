'use strict';

angular.module('app', ['restangular', 'ui.router', 'facebook'])

    /*
        Config
     */
    .constant('config', {
        apiUrl          : 'http://wayapi.mathieuletyrant.com',
        token           : 'KDR8u9vuRH8i6hx8V4e6',
        facebookAppApi  : '828582677192624' // TODO Need change when we have good key from Facebook :)
    })

    /*
        After with API
     */
    //.config(function($httpProvider) {
    //    $httpProvider.defaults.withCredentials = true;
    //})

    /*
        Route System
     */
    .config(function($stateProvider, $urlRouterProvider){

        $urlRouterProvider.otherwise("/home"); // Default Page

        $stateProvider
            .state('home', {
                url: "/home",
                templateUrl: "templates/home.html"
            });
    })

    /*
        Facebook Connect
     */
    .config(function(FacebookProvider, config) {
        FacebookProvider.init(config.facebookAppApi);
    });