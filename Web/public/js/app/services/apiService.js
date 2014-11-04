'use strict';

/*
 * @requires $http (Ajax Request)
 * @requires $q (Promise)
 * @requires config (Config Global for app)
 */
angular.module('app').factory('api', function ($http, $q, config) {

    return {
        /*
         * @name Generate Single questions
         * @param string sexe
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
         * @name Generate Number Questions with Category
         * @param string category
         * @param int number
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

        },

        userRegister: function(params){

            params = params || {};

            var deferred = $q.defer();

            $http({
                method: 'POST',
                url: config.apiUrl + '/users/register',
                data: params
            })
                .success(function (result) {
                    deferred.resolve(result);
                })
                .error(function (result) {
                    deferred.resolve('Erreur :' + result);
                });

            return deferred.promise;
        },

        userExist: function(facebookId){
            facebookId = facebookId || 1;

            var deferred = $q.defer();

            $http({
                method: 'GET',
                url: config.apiUrl + '/users/exist/'+facebookId
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