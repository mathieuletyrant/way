'use strict';

angular.module('app').factory('quizz', function ($q, api, session) {
    return {
        loadQuestions: function (type) {

            var deferred = $q.defer();

            if (type == 'single') {
                api.single(session.getSexe()).then(function(result){
                    deferred.resolve(result);
                });
            }
            else if (type == 'multi') {
                deferred.reject('Do stuff ...');
            }
            else {
                deferred.reject('Type undefined. Must be single or multi');
            }

            return deferred.promise;
        }
    }
});