'use strict';

angular.module('app').factory('apiUser', function($q, $http, overlay, config){
    return{

        /*
         * @name Create User
         * @param object params
         */
        userRegister: function (params) {

            var params_api = {
                facebook_id : params.id,
                firstname   : params.first_name,
                lastname    : params.last_name,
                picture     : params.photo,
                sex         : params.gender
            };

            overlay.set(true);

            var transform = function (data) {
                return $.param(data);
            }

            var deferred = $q.defer();

            $http({
                method: 'POST',
                url: config.apiUrl + '/user/register',
                data: params_api,
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

        /*
         * @name Check if user exist in Way API
         * @param int facebookId
         */
        userExist: function (facebookId) {

            facebookId = facebookId || 1;

            overlay.set(true);

            var deferred = $q.defer();

            $http({
                method: 'GET',
                url: config.apiUrl + '/user/exist/' + facebookId
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

        /*
         * @name Gets Users informations
         * @param int facebookId
         */
        getUser: function (facebookId) {

            facebookId = facebookId || 1;

            overlay.set(true);

            var deferred = $q.defer();

            $http({
                method: 'GET',
                url: config.apiUrl + '/user/get/' + facebookId
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

        /*
         * @name Get profil User
         * @param int facebookId
         */
        profilUser: function(facebookId, sex) {

            var param = {
                    facebook_id: facebookId,
                    sex: sex
                },
                transform = function (data) {
                    return $.param(data);
                };

            overlay.set(true);

            var deferred = $q.defer();

            $http({
                method: 'POST',
                url: config.apiUrl + '/user/profil/',
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

        /*
         * @name Get players with same sexe
         * @param string sexe
         * @param int page
         */
        userSexe: function (sexe) {

            sexe = sexe || 'male';

            overlay.set(true);

            var deferred = $q.defer();

            $http({
                method: 'GET',
                url: config.apiUrl + '/user/sex/'+sexe
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

        userCategory: function(facebook_id, category){

            facebook_id = facebook_id || 0;
            category = category || 'geek';

            overlay.set(true);

            var deferred = $q.defer();

            $http({
                method: 'GET',
                url: config.apiUrl + '/user/category/'+facebook_id+'/'+category
            })
                .success(function () {
                    overlay.set(false);
                    deferred.resolve(true);
                })
                .error(function () {
                    overlay.set(false);
                    deferred.reject(false);
                })

            return deferred.promise;
        }
    }
});