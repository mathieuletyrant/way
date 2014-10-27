angular.module('services', [])

.factory('api', function($http, $q, config){

    return {

        goodDealByCategory: function (category, page) {

            category = category || 'geek';
            page = page || 1;

            var deferred = $q.defer();

            $http({
                method: 'GET',
                url: config.apiUrl + '/A FAIRE/' + category + '/' + page
            })
            .success(function (result) {
                deferred.resolve(result);
            })
            .error(function (result) {
                deferred.resolve('Erreur :' + result);
            });

            return deferred.promise;

        },

        goodDealById: function(id){

            id = id || 1;

            $http({
                method: 'GET',
                url: config.apiUrl + '/A FAIRE/' + id
            })
            .success(function (result) {
                deferred.resolve(result);
            })
            .error(function (result) {
                deferred.resolve('Erreur :' + result);
            });

            return deferred.promise;
        },

        goodDealPrimary: function(category){

            category = category || 'geek';

            $http({
                method: 'GET',
                url: config.apiUrl + '/A FAIRE/' + category
            })
                .success(function (result) {
                    deferred.resolve(result);
                })
                .error(function (result) {
                    deferred.resolve('Erreur :' + result);
                });

            return deferred.promise;
        }
    };
})

.service('overlay', function(config){

    this.set = function (value) {
        config.overlay = value;
    };

    this.get = function () {
        return config.overlay;
    };

});