'use strict';

angular.module('app').controller('quizzController', function ($scope, $stateParams, quizz, config) {

    var type = $stateParams.type || 'single';

    /*
     * Load questions Single/Multi
     */
    quizz.loadQuestions(type).then(function (result) {
        $scope.questions = result.questions;
    }, function () {
        return 'Error during parse questions.';
    });

    /*
     * Quizz Start at Question 0 !
     */
    $scope.currentQuestion = 0;

    /*
     * Get PATH for img Url
     */
    $scope.path = config.apiUrl;

    /*
     * Content all responses for all questions
     */
    $scope.responses = quizz.emptyResponses();

    /*
     * Next Questions
     * TODO Move to Service
     */
    $scope.newQuestion = function (index) {

        var question = $scope.questions[$scope.currentQuestion];

        /* Good Answer with current Question */
        if (question.anwsers[index].status == 1) {
            $scope.responses[$scope.currentQuestion].value = 1;
            console.log('[QUIZZ] : Good answer');
        }
        else{
            $scope.responses[$scope.currentQuestion].value = 0;
            console.log('[QUIZZ] : Bad answer');
        }

        /* Check if last question */
        if($scope.currentQuestion == 19){
            console.log('[QUIZZ] : Challenge '+type+' done');
            if(type === 'single'){
                /*
                 * Create Algo for now what category is
                 * Asign category to the player in session & API WAY
                 */
            }
            else{
                /*
                 * Save response in API WAY
                 * Seed Notification to the second player.
                 */
            }
        }
        else{
            $scope.currentQuestion++;
            console.log('[QUIZZ] : Next question : '+$scope.currentQuestion);
        }
    };

});