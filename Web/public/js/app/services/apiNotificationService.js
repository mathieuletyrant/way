'use strict';

angular.module('app').factory('apiNotification', function($q, $http, overlay, config){

    return{

        /*
         * @name Gets Notifications Users
         * @param int facebookId
         */
        getNotifications: function (facebookId) {

            facebookId = facebookId || 1;

            var deferred = $q.defer();

            $http({
                method: 'GET',
                url: config.apiUrl + '/notification/get/' + facebookId
            })
                .success(function (result) {
                    deferred.resolve(result);
                })
                .error(function (result) {
                    deferred.reject('Erreur :' + result);
                });

            return deferred.promise;
        },

        addNotification: function (userId, friendId, blindId) {

            var param = {
                    user_id: userId,
                    friend_id: friendId,
                    blind_id: blindId
                },
                transform = function (data) {
                    return $.param(data);
                };

            overlay.set(true);

            var deferred = $q.defer();

            $http({
                method: 'POST',
                url: config.apiUrl + '/notification/add',
                data: param,
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                transformRequest: transform
            })
                .success(function (result) {
                    overlay.set(false);
                    deferred.resolve(result);
                })
                .error(function (result) {
                    overlay.set(false);
                    deferred.reject('Erreur :' + result);
                });

            return deferred.promise;
        },

        removeNotification: function (userId, friendId) {
            // Do stuff ...
        }

    }

});