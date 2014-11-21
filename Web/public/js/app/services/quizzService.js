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

        loadQuestions: function (type, category, blindId) {

            category = category || null;
            blindId = blindId || 0;

            var deferred = $q.defer();

            if (type == 'single') {
                api.single(session.getSexe()).then(function(result){
                    deferred.resolve(result);
                });
            }
            else if (type == 'multi') {
                if(blindId != 0){
                    api.multiWithBlindId(blindId).then(function(){
                       deferred.resolve(result);
                    });
                }
                else{
                    api.multi(category, 20).then(function(result){
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