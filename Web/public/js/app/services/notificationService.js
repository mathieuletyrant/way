'use strict';

angular.module('app').service('notification', function($q, api, session){

    this.getNotifications = function(){

        var deferred = $q.defer();

        api.getNotifications(session.getUser().facebook_id).then(function (result) {
            deferred.resolve(result.notifications);
        });

        return deferred.promise;
    };

});