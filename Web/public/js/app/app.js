'use strict';

angular.module('app', ['ui.router', 'facebook', 'ngStorage', 'ngAria'])

    /*
        Config
     */
    .constant('config', {
        path                    : '/Web',
        apiUrl                  : 'http://api.whoareyou.io',
        token                   : 'KDR8u9vuRH8i6hx8V4e6',
        facebookAppApi          : '828582677192624',
        intervalNotification    : 1,
        timeMusic               : 15,
        antiFlood               : 30,
        overlay                 : false,
        dev                     : true
    })

    /*
        Route System
     */
    .config(function($stateProvider, $urlRouterProvider, $locationProvider, config){

        $urlRouterProvider.otherwise("/"); // Default Page

        if(!config.dev){
            $locationProvider.html5Mode(true);
            $locationProvider.hashPrefix('!');
        }

        $stateProvider
            .state('home', {
                url: "/",
                templateUrl: 'templates/home.html',
                seo: {
                    title: 'Accueil',
                    desc: ''
                }
            })
            .state('letsgo', {
                url: "/letsgo",
                templateUrl: 'templates/letgo.html',
                seo: {
                    title: '',
                    desc: ''
                }
            })
            .state('defi', {
                url: "/defi/:user_1/:user_2/:category/:status/:blindId",
                templateUrl: 'templates/defi.html',
                seo: {
                    title: 'Defi',
                    desc: ''
                }
            })
            .state('profil', {
                url: "/profil",
                templateUrl: 'templates/profil.html',
                seo: {
                    title: 'Profil de votre compte',
                    desc: ''
                }
            })
            .state('quizz', {
                url: "/quizz/:type/:user_1/:user_2/:category/:blindId",
                templateUrl: 'templates/quizz.html',
                seo: {
                    title: 'Quizz',
                    desc: ''
                }
            })
            .state('choose', {
                url: "/choose",
                templateUrl: 'templates/choose.html',
                seo: {
                    title: 'Choisis un adversaire',
                    desc: ''
                }
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
    })

    /*
     * Custom Title and Description TAG
     * For SEO
     */
    .run(function($rootScope){
        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
            $rootScope.title = toState.seo.title;
            $rootScope.desc = toState.seo.desc;
        });
    });