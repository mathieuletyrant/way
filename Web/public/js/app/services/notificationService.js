'use strict';

angular.module('app').service('notification', function ($q, api, session) {

    var userId = session.getUser().facebook_id;

    this.getNotifications = function () {

        var deferred = $q.defer();

        api.getNotifications(userId).then(function (result) {
            deferred.resolve(result.notifications);
        });

        return deferred.promise;
    };

    this.removeNotification = function (friendId) {
        var deferred = $q.defer();

        api.removeNotification(userId, friendId).then(function(){
            return "Notification remove";
        });

        return deferred.promise;
    };

});