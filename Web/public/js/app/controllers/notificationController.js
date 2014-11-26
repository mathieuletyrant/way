'use strict';

angular.module('app').controller('notificationController', function ($rootScope, $scope, $state, $interval, session, config, notification) {

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
        notification.removeNotification(id).then(function(result){
            console.log(result);
            $state.go('quizz', {
                type: 'multi',
                user_1: facebookId,
                user_2: friendId,
                category: category,
                blindId: blindId
            });
        });
    };

    /*
     * Refuse Quizz
     */
    $scope.refuse = function (bindId, id) {
        notification.removeNotification(id).then(function(result){
            console.log(result);
        });
    };

    /*
     * Redirect to Defi with result
     */
    $scope.showResult = function (id, blindId, category, facebookId, friendId) {
        notification.removeNotification(id).then(function(){
            $state.go('defi', {
                user_1: facebookId,
                user_2: friendId,
                category: category,
                status: 1,
                blindId: blindId
            });
        });
    };

    /*
     * Check when user change page for delete the Interval :)
     */
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
        if(fromState.name == 'home'){
            $interval.cancel(interval);
        }
    });

});