'use strict';

angular.module('app').factory('apiNotification', function($q, $http, overlay, config){

    return{

        /*
         * @name Gets Notifications Users
         * @param int facebookId
         */
        getNotifications: function (receiverId) {

            receiverId = receiverId || null;

            var deferred = $q.defer();

            $http({
                method: 'GET',
                url: config.apiUrl + '/notification/get/'+receiverId
            })
                .success(function (result) {
                    deferred.resolve(result);
                })
                .error(function (result) {
                    deferred.reject('Erreur :' + result);
                });

            return deferred.promise;
        },

        /*
         * @name Add a notification
         * @param int receiverId
         * @param string type
         * @param int userId
         * @param int friendId
         * @param int blindId
         * @param string message
         * @param string category
         */
        addNotification: function (receiverId, type, userId, friendId, blindId, message, category) {

            var param = {
                    receiver_id : receiverId    || null,
                    type        : type          || null,
                    user_id     : userId        || null,
                    friend_id   : friendId      || null,
                    blind_id    : blindId       || null,
                    message     : message       || null,
                    category    : category      || null
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