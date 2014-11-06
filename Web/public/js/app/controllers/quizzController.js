'use strict';

angular.module('app').controller('quizzController', function($scope, $stateParams, quizz){

    var type = $stateParams.type || 'single';

    /*
     * Load questions Single/Multi
     */
    quizz.loadQuestions(type).then(function(result){
        $scope.questions = result.questions;
    }, function(){
        return 'Error during parse questions.';
    });

});