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

    /*
     * Quizz Start at Question 0 !
     */
    $scope.currentQuestion = 0;

    /*
     * Content all responses for all questions
     */
    $scope.responses = quizz.emptyResponses();

    /*
     * Next Questions
     */
    $scope.newQuestion = function(){
        $scope.responses[$scope.currentQuestion].value = Math.round(Math.random());
        $scope.currentQuestion++;
    };

});