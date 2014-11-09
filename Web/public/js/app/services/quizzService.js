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
                deferred.resolve('Do stuff ...');
            }
            else {
                deferred.reject('Type undefined. Must be single or multi');
            }

            return deferred.promise;
        },
        /* LOL */
        emptyResponses: function (){
            return [
                {value: -1},
                {value: -1},
                {value: -1},
                {value: -1},
                {value: -1},
                {value: -1},
                {value: -1},
                {value: -1},
                {value: -1},
                {value: -1},
                {value: -1},
                {value: -1},
                {value: -1},
                {value: -1},
                {value: -1},
                {value: -1},
                {value: -1},
                {value: -1},
                {value: -1},
                {value: -1}
            ];

        }
    }
});