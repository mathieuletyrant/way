angular.module('app', ['restangular', 'ui.router'])

    .constant('config', {
        apiUrl: 'http://wayapi.mathieuletyrant.com',
        token: 'KDR8u9vuRH8i6hx8V4e6'
    })
    .config(function($stateProvider, $urlRouterProvider){

        $urlRouterProvider.otherwise("/state1"); // Default Page

        $stateProvider
            .state('home', {
                url: "/home",
                templateUrl: "templates/home.html"
            });
    });