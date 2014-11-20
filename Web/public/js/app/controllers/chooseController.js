'use strict';

angular.module('app').controller('chooseController', function ($scope, $state, $timeout, session, mail, config, api, choose) {

    /*
     * If we are not logged -> redirect to home
     */
    if (session.getLogged() === false) {
        $state.go('home');
    }
    else {
        var timer = false;
        $scope.user = session.getUser();
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
     * Choose player !
     */
    $scope.choosePlayer = function (facebookId) {
        $state.go('defi', {
            user_1: $scope.user.facebook_id,
            user_2: facebookId,
            category: $scope.blind.category
        });
    };

    /*
     * Seed Mail
     */
    $scope.seedMail = function (isValid) {
        if (isValid) {

            if (!session.getTimeStamp()) {
                mail.seed($scope.mailForm.mail, $scope.user.firstname, $scope.user.lastname, $scope.mailForm.message).then(function () {
                    $scope.mailForm.seeded = true;
                });
                session.setTimeStamp();
            }
            else {
                if (((new Date() - session.getTimeStamp) / 1000) > config.antiFlood) {
                    mail.seed($scope.mailForm.mail, $scope.user.firstname, $scope.user.lastname, $scope.mailForm.message).then(function () {
                        $scope.mailForm.seeded = true;
                    });
                    session.setTimeStamp();
                }
            }

        }
    };

    /*
     * Selects users
     */
    api.userSexe($scope.user.sex).then(function (result) {
        $scope.users = result;
        $timeout(choose.style, 1000);
    });

});