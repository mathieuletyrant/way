'use strict';

angular.module('app').controller('notificationController', function ($scope, $interval, api, session, config) {

    $scope.notifications = {};

    var interval;

    /*
     * If user logged, get all notifications
     */
    if (session.getLogged()) {

        api.getNotifications(session.getUser().facebook_id).then(function (result) {
            $scope.notifications = result.notifications;
        });

        /* Interval, not very good :) */
        interval = $interval(function(){
            api.getNotifications(session.getUser().facebook_id).then(function (result) {
                $scope.notifications = result.notifications;
            });
        }, config.intervalNotification * 1000);

    }

    /*
     * Check if notifications changes
     */
    $scope.$watch('notification', function (newVal, oldVal) {
        $scope.notifications = newVal;
    }, true);


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
        var id = $(e.target).data('id');
        console.log('Notification refuse :' + id);
    };

    /*
     * Check when user change page for delete the Interval :)
     */
    $scope.$on('$locationChangeStart', function () {
        $interval.cancel(interval);
    });

});