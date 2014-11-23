'use strict';

angular.module('app').factory('quotes', function($q, $http, overlay){

    return {
        get: function () {

            overlay.set(true);

            var deferred = $q.defer();

            $http({
                method: 'GET',
                url: '/Web/public/js/quotes.json' // Delete WEB on FTP
            })
                .success(function (result) {
                    overlay.set(false);
                    deferred.resolve(result);
                });

            return deferred.promise;
        }
    }
});