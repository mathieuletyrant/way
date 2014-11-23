'use strict';

angular.module('app').factory('quotes', function($q, $http, overlay, config){

    return {
        get: function () {

            overlay.set(true);

            var deferred = $q.defer();

            $http({
                method: 'GET',
                url: config.path+'/public/js/quotes.json'
            })
                .success(function (result) {
                    overlay.set(false);
                    deferred.resolve(result);
                });

            return deferred.promise;
        }
    }
});