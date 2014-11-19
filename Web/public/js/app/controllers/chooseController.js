'use strict';

angular.module('app').controller('chooseController', function ($scope, $state, session, mail, config) {

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

            if(!session.getTimeStamp()) {
                mail.seed($scope.mailForm.mail, $scope.user.firstname, $scope.user.lastname, $scope.mailForm.message).then(function(){
                    $scope.mailForm.seeded = true;
                });
                session.setTimeStamp();
            }
            else {
                if(((new Date() - session.getTimeStamp) / 1000) > config.antiFlood){
                    mail.seed($scope.mailForm.mail, $scope.user.firstname, $scope.user.lastname, $scope.mailForm.message).then(function(){
                        $scope.mailForm.seeded = true;
                    });
                    session.setTimeStamp();
                }
            }

        }
    };

    /*
     * Listen input for search player
     */
    $scope.$watch('search.friend', function(newVal){
        // Do stuff ....
    });
});