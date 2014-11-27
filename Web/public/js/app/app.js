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
                    desc: 'Way est un test de personnalité basé sur un blind test. Découvrez à quelle catégorie vous appartenez en répondant à notre quizz musical.'
                }
            })
            .state('letsgo', {
                url: "/letsgo",
                templateUrl: 'templates/letgo.html',
                seo: {
                    title: 'Informations',
                    desc: '20 questions vont vous être posées lors du test que vous vous apprêter à faire. Vous aurez 15 secondes pour répondre à chaque question.'
                }
            })
            .state('defi', {
                url: "/defi/:user_1/:user_2/:category/:status/:blindId",
                templateUrl: 'templates/defi.html',
                seo: {
                    title: 'Défi',
                    desc: 'Vous êtes sur le point de défier votre ami dans la catégorie de votre choix. Que le meilleur gagne !'
                }
            })
            .state('profil', {
                url: "/profil",
                templateUrl: 'templates/profil.html',
                seo: {
                    title: 'Profil',
                    desc: 'Découvrez votre profil qui a été établi en fonction de vos réponses au quizz que vous venez de faire.'
                }
            })
            .state('quizz', {
                url: "/quizz/:type/:user_1/:user_2/:category/:blindId",
                templateUrl: 'templates/quizz.html',
                seo: {
                    title: 'Quizz',
                    desc: 'Le blind test Way c\'est 20 questions, 15 secondes pour répondre à chacune d\'elle.'
                }
            })
            .state('choose', {
                url: "/choose",
                templateUrl: 'templates/choose.html',
                seo: {
                    title: 'Choisis un adversaire',
                    desc: 'Choisissez une catégorie et un ami à défier dans celle-ci. Qui sera victorieux ?'
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