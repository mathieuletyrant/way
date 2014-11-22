'use strict';

angular.module('app').factory('apiMail', function ($http, $q, overlay, config) {
    return {
        seed: function (mail, firstname, lastname, message) {

            var param = {
                    mail: mail,
                    firstname: firstname,
                    lastname: lastname,
                    message: message
                },
                transform = function (data) {
                    return $.param(data);
                };

            overlay.set(true);

            var deferred = $q.defer();

            $http({
                method: 'POST',
                url: config.apiUrl + '/user/mail',
                data: param,
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                transformRequest: transform
            })
            .success(function (result) {
                overlay.set(false);
                deferred.resolve(true);
            })
            .error(function (result) {
                overlay.set(false);
                deferred.resolve(false);
            });

            return deferred.promise;
        }
    }
});