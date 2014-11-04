'use strict';
/*
 * @requires $scope
 * @require Facebook (Service for Facebook Connect)
 */
angular.module('app').controller('authenticationController', function ($scope, Facebook, $sessionStorage, api) {

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

                var user = response;

                api.userExist(user.id).then(function(response){
                    if(response === false){
                        Facebook.api('me/picture?width=200&height=200&redirect=false', function(response){
                            user.photo = response.url;
                            api.userRegister(user);
                            $sessionStorage.user = {
                                logged: true,
                                name: user.name
                            };
                            $scope.user = response;
                            $scope.logged = true;
                        });
                    }
                });

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