'use strict';

angular.module('app').controller('notificationController', function ($scope, $state, $interval, session, config, notification) {

    $scope.notifications = {};
    $scope.newNotification = false;

    var interval;

    /*
     * If user logged, get all notifications
     */
    if (session.getLogged()) {

        notification.getNotifications().then(function(result){
            console.log(result);
            $scope.notifications = result;
        });

        /* Interval, not very good :) */
        interval = $interval(function(){
            notification.getNotifications().then(function(result){
                if(!angular.equals($scope.notifications, result)){
                    $scope.newNotification = true;
                }
                $scope.notifications = result;
            });
        }, config.intervalNotification * 1000);

    }

    /*
     * Accept Quizz
     */
    $scope.accept = function (id, blindId, category, facebookId, friendId) {
        $state.go('quizz', {
            type: 'multi',
            user_1: facebookId,
            user_2: friendId,
            category: category,
            blindId: blindId
        });
        // TODO DELETE Notification With ID
    };

    /*
     * Refuse Quizz
     */
    $scope.refuse = function (bindId, id) {
        // TODO Delete Notification & Blind ID
    };

    /*
     * Redirect to Defi with result
     */
    $scope.showResult = function (id, blindId, category, facebookId, friendId) {
        // TODO Redirect to Defi with result and delete Notification
    };

    /*
     * Check when user change page for delete the Interval :)
     */
    $scope.$on('$locationChangeStart', function () {
        $interval.cancel(interval);
    });

});