'use strict';

angular.module('app').factory('apiBlind', function ($http, $q, config, overlay) {

    return {

        /*
         * @name Generate Single questions
         * @param string sexe
         */
        single: function (sexe) {

            sexe = sexe || 'mal';

            overlay.set(true);

            var deferred = $q.defer();

            $http({
                method: 'GET',
                url: config.apiUrl + '/blind/generate/single/' + sexe
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
         * @name Generate Number Questions with Category
         * @param string category
         * @param int number
         */
        multi: function (category, number) {

            category = category || 'geek';
            number = number || 1;

            overlay.set(true);

            var deferred = $q.defer();

            $http({
                method: 'GET',
                url: config.apiUrl + '/blind/generate/multi/' + category + '/' + number
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

        multiWithBlindId: function (blindId) {

            blindId = blindId || 0;

            overlay.set(true);

            var deferred = $q.defer();

            $http({
                method: 'GET',
                url: config.apiUrl + '/blind/generate/'+blindId
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
         * @name Start a blind and add it in API
         * @param string type
         * @param int userId
         * @param int friendId
         */
        blindStart: function (type, userId, friendId) {

            var param = {
                    type: type || 'single',
                    user_id: userId || null,
                    friend_id: friendId || ''
                },
                transform = function (data) {
                    return $.param(data);
                };

            overlay.set(true);

            var deferred = $q.defer();

            $http({
                method: 'POST',
                url: config.apiUrl + '/blind/start',
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
         * @name Add in API the response choose
         * @param int blindId
         * @param int questionId
         * @param int|null responseId
         */
        blindResponse: function (blindId, questionId, responseId) {

            var param = {
                    blind_id: blindId,
                    question_id: questionId,
                    response_id: responseId || 0
                },
                transform = function (data) {
                    return $.param(data);
                };

            $http({
                method: 'POST',
                url: config.apiUrl + '/blind/response',
                data: param,
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                transformRequest: transform
            })
                .success(function (result) {
                    console.log(result);
                    return true;
                })
                .error(function (result) {
                    console.log(result);
                    return false;
                });

        },

        /*
         * @name Update Blind
         * @param int blindId
         * @param string status
         */
        blindUpdate: function (blindId, status) {

            var param = {
                    id: blindId,
                    status: status
                },
                transform = function (data) {
                    return $.param(data);
                };

            overlay.set(true);

            var deferred = $q.defer();

            $http({
                method: 'POST',
                url: config.apiUrl + '/blind/update',
                data: param,
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                transformRequest: transform
            })
                .success(function () {
                    overlay.set(false);
                    deferred.resolve(true);
                })
                .error(function () {
                    overlay.set(false);
                    deferred.resolve(false);
                });

            return deferred.promise;
        }
    };

});