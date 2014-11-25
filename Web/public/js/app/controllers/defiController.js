'use strict';

angular.module('app').controller('defiController', function ($scope, $state, $stateParams, $timeout, session, apiUser, defi) {

    /*
     * If we are not logged -> redirect to home
     */
    if (session.getLogged() === false) {
        $state.go('home');
    }
    else {
        var status          = $stateParams.status;
        $scope.categoryDefi = $stateParams.category;
        $scope.users        = {};
        $scope.users.user_1 = session.getUser();
    }

    /*
     * END
     */
    if (status == 1){
        $scope.end = true;
        $scope.determinant = (session.getSexe() == 'male') ? 'un' : 'une';
        defi.animation().then(function(){
            $scope.display = true;
            $timeout(function(){
                $scope.endMessage = true;
            }, 1000);
        });
    }

    /*
     * Start QUIZZ if status = 0
     */
    if(status == 0){
        $scope.startQuizz = function () {
            $state.go('quizz', {
                type: 'multi',
                user_1: $scope.users.user_1.facebook_id,
                user_2: $scope.users.user_2.facebook_id,
                category: $scope.categoryDefi,
                blindId: 0
            });
        };
    }

    /*
     * GET Informations Users
     */
    apiUser.getUser($stateParams.user_2).then(function (result) {
        $scope.users.user_2 = result.users;
    });

});