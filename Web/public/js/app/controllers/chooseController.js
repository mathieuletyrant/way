'use strict';

angular.module('app').controller('chooseController', function ($scope, $state, session) {

    /*
     * If we are not logged -> redirect to home
     */
    if (session.getLogged() === false) {
        $state.go('home');
    }
    else {
        $scope.user  = session.getUser();
        $scope.blind = {
            category: ''
        };
    }

    /*
     * Prepare blind
     */
    $scope.chooseCategory = function (category) {
        $scope.blind.category = category;
    };

    /*
     * Seed Mail
     */
    $scope.seedMail = function (isValid) {
        if (isValid) {
            console.log($scope.mailForm);
            // Do stuff ....
        }
    };

    /*
     * Listen input for search player
     */
    $scope.$watch('search.friend', function(newVal){
        // Do stuff ....
    });
});