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
        console.log(facebookId);
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
        $timeout(choose.style, 1500);
    });

    /*
     * Listen input for search player
     */
    $scope.$watch('search.friend', function (newVal) {
        if(!angular.isUndefined(newVal)){
            if (timer) {
                $timeout.cancel(timer);
            }
            timer = $timeout(function () {
                console.log(newVal);
            }, 1000);
        }
    });
});