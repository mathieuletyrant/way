angular.module('app').factory('api', function($http, $q, config){

    return {
        single: function(sexe){

            sexe = sexe || 'mal';

            var deferred = $q.defer();

            $http({
                method: 'GET',
                url: config.apiUrl+'/blind/generate/single/'+sexe
            })
            .success(function(result){
                deferred.resolve(result);
            })
            .error(function(result){
                deferred.resolve('Erreur :'+result);
            });

            return deferred.promise;

        }
    };

});



