'use strict';

angular.module('app').controller('defiController', function ($scope, $state, $stateParams, $timeout, session, apiUser, defi, apiBlind, overlay) {

    /*
     * If we are not logged -> redirect to home
     */
    if (session.getLogged() === false) {
        $state.go('home');
        return;
    }
    else {
        var status          = $stateParams.status;
        $scope.result       = {
            user_1: 0,
            user_2: 0
        };
        $scope.categoryDefi = $stateParams.category;
        $scope.users        = {};
        $scope.users.user_1 = session.getUser();
    }

    /*
     * GET Informations Users
     */
    apiUser.getUser($stateParams.user_2).then(function (result) {
        $scope.users.user_2 = result.users;
    });

    /*
     * END
     */
    if (status == 1){
        $scope.end = true;
        $scope.determinant = (session.getSexe() == 'male') ? 'un' : 'une';
        apiBlind.resultBlind($stateParams.blindId, $scope.users.user_1.facebook_id).then(function(result){
            $scope.result.user_1 = result.responses.total;

            apiBlind.resultBlind($stateParams.blindId, $scope.users.user_2.facebook_id).then(function(result){
                $scope.result.user_2 = result.responses.total;

                if($scope.result.user_1 > $scope.result.user_2){
                    $scope.winner = $scope.users.user_1.firstname+' '+$scope.users.user_1.lastname;
                }
                else if($scope.result.user_2 > $scope.result.user_1){
                    $scope.winner = $scope.users.user_2.firstname+' '+$scope.users.user_2.lastname;
                }
                else{
                    $scope.winner = 'NO_WINNER';
                }

                overlay.set(true);
                $timeout(function(){
                    defi.animation().then(function(){
                        $scope.display = true;
                        $timeout(function(){
                            overlay.set(false);
                            $scope.endMessage = true;
                        }, 1000);
                    });
                }, 2000);

            });

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

});