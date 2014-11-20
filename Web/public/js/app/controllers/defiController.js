'use strict';

angular.module('app').controller('defiController', function ($scope, $state, $stateParams, session, api) {

    /*
     * If we are not logged -> redirect to home
     */
    if (session.getLogged() === false) {
        $state.go('home');
    }
    else {
        $scope.categoryDefi = $stateParams.category;
        $scope.users = {};
        $scope.users.user_1 = session.getUser();
    }

    /*
     * GET Informations Users
     */
    api.getUser($stateParams.user_2).then(function (result) {
        $scope.users.user_2 = result.users;
    });

    $scope.startQuizz = function () {
        $state.go('quizz', {
            type: 'multi',
            user_1: $scope.users.user_1.facebook_id,
            user_2: $scope.users.user_2.facebook_id
        });
    };

});