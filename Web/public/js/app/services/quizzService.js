'use strict';

angular.module('app').factory('quizz', function ($q, api, session) {
    return {

        blindStart: function(type, friendId){
            var deferred = $q.defer();

            api.blindStart(type, session.getUser().facebook_id, friendId).then(function(result){
                deferred.resolve(result.blind.id);
            });

            return deferred.promise;
        },

        addResponse: function(blindId, questionId, responseId){

            if(responseId){
                api.blindResponse(blindId, questionId, responseId);
            }
            else{
                api.blindResponse(blindId, questionId);
            }

        },

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