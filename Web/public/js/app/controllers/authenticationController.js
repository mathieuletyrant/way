'use strict';
/*
 * @requires $scope
 * @require Facebook (Service for Facebook Connect)
 */
angular.module('app').controller('authenticationController', function ($scope, $state, Facebook, apiUser, session) {

    /*
     * Test already logged
     */
    if (!session.getLogged()) {
        $scope.logged = false;
        $scope.user = {};
    }
    else {
        $scope.user = session.getUser();
        $scope.logged = session.getLogged();
    }

    /*
     * Watch scope Logged
     */
    $scope.$watch('logged', function (newVal, oldVal) {
        session.loggedUser(newVal);
    }, true);

    /*
     * Login
     */
    $scope.login = function () {
        Facebook.login(function (response) {
            if (response.status == 'connected') {
                $scope.me();
            }
        });
    };

    /*
     * Logout
     */
    $scope.logout = function () {
        session.deleteUser();
        $scope.logged = false;
    };

    /*
     * me
     */
    $scope.me = function () {
        Facebook.api('/me', function (response) {

            var user = response;

            $scope.$apply(function () {

                apiUser.userExist(user.id).then(function (response) {

                    if (response.message === "user not found") {

                        console.log("[SUBSCRIBE] : User don't exist ...");

                        Facebook.api('me/picture?width=200&height=200&redirect=false', function (response) {

                            console.log('[SUBSCRIBE] : Searching Picture for subscribe');
                            user.photo = response.data.url;

                            apiUser.userRegister(user).then(function () {
                                console.log('[SUBSCRIBE] : Registering user in WAY API');

                                apiUser.getUser(user.id).then(function(result){
                                    session.saveUser(result.users);
                                    $scope.logged = true;
                                    $scope.user = session.getUser();
                                    console.log('[SUBSCRIBE] : User connected');
                                });

                            });

                        });
                    }
                    else {

                        apiUser.getUser(user.id).then(function(result){
                            session.saveUser(result.users);
                            $scope.logged = true;
                            $scope.user = session.getUser();
                            console.log('[SUBSCRIBE] : User exist and connected');
                        });

                    }
                });

            });
        });
    };

});