'use strict';

angular.module('app').factory('quizz', function ($q, apiBlind, session) {
    return {

        blindStart: function(type, friendId){

            var deferred = $q.defer();

            apiBlind.blindStart(type, session.getUser().facebook_id, friendId).then(function(result){
                deferred.resolve(result.blind.id);
            });

            return deferred.promise;
        },

        addResponse: function(blindId, questionId, responseId, userId){

            if(responseId){
                apiBlind.blindResponse(blindId, userId, questionId, responseId);
            }
            else{
                apiBlind.blindResponse(blindId, userId, questionId);
            }

        },

        loadQuestions: function (type, category, blindId) {

            category = category || null;
            blindId = blindId || 0;

            var deferred = $q.defer();

            if (type == 'single') {
                apiBlind.single(session.getSexe()).then(function(result){
                    deferred.resolve(result);
                });
            }
            else if (type == 'multi') {
                if(blindId != 0){
                    apiBlind.multiWithBlindId(blindId).then(function(result){
                       deferred.resolve(result);
                    });
                }
                else{
                    apiBlind.multi(category, 20).then(function(result){
                        deferred.resolve(result.questions);
                    });
                }
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