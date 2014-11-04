'use strict';
/*
 * @requires $scope
 * @require Facebook (Service for Facebook Connect)
 */
angular.module('app').controller('authenticationController', function ($scope, Facebook, api, session) {

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
                    if(response.message === "user not found"){

                        console.log("[SUBSCRIBE] : User don't exist ...");

                        Facebook.api('me/picture?width=200&height=200&redirect=false', function(response){

                            console.log('[SUBSCRIBE] : Searching Picture for subscribe');
                            user.photo = response.url;
                            api.userRegister(user).then(function(result){
                                console.log(result);
                                console.log('[SUBSCRIBE] : Registering user in WAY API');
                                session.saveUser(user);
                                $scope.user = user;
                                $scope.logged = true;
                                console.log('[SUBSCRIBE] : User connected');
                            }, function(result){
                                console.log(result);
                            });

                        });
                    }
                    else{
                        session.saveUser(user);
                        $scope.user = user;
                        $scope.logged = true;
                        console.log('[SUBSCRIBE] : User exist and connected');
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
                session.deleteUser();
                $scope.user   = {};
                $scope.logged = false;
            });
        });
    };
});