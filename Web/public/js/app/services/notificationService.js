'use strict';

angular.module('app').service('notification', function ($q, apiNotification, session) {

    this.getNotifications = function () {

        var deferred = $q.defer();

        apiNotification.getNotifications(session.getUser().facebook_id).then(function (result) {
            deferred.resolve(result.notifications);
        });

        return deferred.promise;
    };

    this.removeNotification = function (friendId) {
        var deferred = $q.defer();

        apiNotification.removeNotification(session.getUser().facebook_id, friendId).then(function(){
            return "Notification remove";
        });

        return deferred.promise;
    };

});