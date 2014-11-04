'use strict';
/*
 * @requires $scope
 * @require Facebook (Service for Facebook Connect)
 */
angular.module('app').controller('authenticationController', function ($scope, Facebook, $sessionStorage) {

    $scope.user = {};
    $scope.logged = false;

    /*
     * Watch for Facebook to be ready.
     * There's also the event that could be used
     */
    $scope.$watch(
        function() {
            return Facebook.isReady();
        },
        function(newVal) {
            if (newVal){
                $scope.facebookReady = true;
            }
        }
    );

    var userIsConnected = false;

    Facebook.getLoginStatus(function(response) {
        if (response.status == 'connected') {
            userIsConnected = true;
        }
    });

    /*
     * Login
     */
    $scope.login = function() {
        Facebook.login(function(response) {
            if (response.status == 'connected') {
                $sessionStorage.user = {
                    logged: true
                };
                $scope.logged = true;
                $scope.me();
            }
        });
    };

    /*
     * me
     */
    $scope.me = function() {
        Facebook.api('/me', function(response) {
            $scope.$apply(function() {
                $sessionStorage.user.name = response.name;
                $scope.user = response;
            });

        });
    };

    /*
     * Logout
     */
    $scope.logout = function() {
        Facebook.logout(function() {
            $scope.$apply(function() {
                delete $sessionStorage.user;
                $scope.user   = {};
                $scope.logged = false;
            });
        });
    };
});