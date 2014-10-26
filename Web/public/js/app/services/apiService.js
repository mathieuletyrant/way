angular.module('app').factory('api', function ($http, $q, config) {

    return {
        /*
         Generate Single questions (20)
         $param : sexe
         */
        single: function (sexe) {

            sexe = sexe || 'mal';

            var deferred = $q.defer();

            $http({
                method: 'GET',
                url: config.apiUrl + '/blind/generate/single/' + sexe
            })
            .success(function (result) {
                deferred.resolve(result);
            })
            .error(function (result) {
                deferred.resolve('Erreur :' + result);
            });

            return deferred.promise;

        },

        /*
         Generate Number Questions with Category
         @params : category
         @params : number
         */
        multi: function (category, number) {

            category = category || 'geek';
            number = number || 1;

            var deferred = $q.defer();

            $http({
                method: 'GET',
                url: config.apiUrl + '/blind/generate/multi/' + category + '/' + number
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

});