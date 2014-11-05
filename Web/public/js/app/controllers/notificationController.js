'use strict';

angular.module('app').controller('notificationController', function ($scope, $interval, session, config, notification) {

    $scope.notifications = {};
    $scope.newNotification = false;

    var interval;

    /*
     * If user logged, get all notifications
     */
    if (session.getLogged()) {

        notification.getNotifications().then(function(result){
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
    $scope.accept = function (e) {
        var id = $(e.target).data('id');
        console.log('Notification accept: ' + id);
    };

    /*
     * Refuse Quizz
     */
    $scope.refuse = function (e) {
        var friendId = $(e.target).data('id');
        notification.removeNotification(friendId).then(function(){
            console.log('Une notification a été supprimé. Un challenge a été refusé.');
        });
        // TODO Delete current Challenge
    };

    /*
     * Check when user change page for delete the Interval :)
     */
    $scope.$on('$locationChangeStart', function () {
        $interval.cancel(interval);
    });

});