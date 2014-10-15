'use strict';

angular.module('app').controller('authenticationController', function ($scope, Facebook) {

    $scope.loginStatus = 'disconnected';
    $scope.facebookIsReady = false;
    $scope.user = null;

    $scope.login = function () {
        Facebook.login(function(response) {
            $scope.loginStatus = response.status;
        });
    };

    $scope.removeAuth = function () {
        Facebook.api({
            method: 'Auth.revokeAuthorization'
        }, function(response) {
            Facebook.getLoginStatus(function(response) {
                $scope.loginStatus = response.status;
            });
        });
    };

    $scope.api = function () {
        Facebook.api('/me', function(response) {
            $scope.user = response;
        });
    };

});