'use strict';

angular.module('app').controller('quizzController', function ($scope, $stateParams, $state, $interval, quizz, config, session) {

    var type = $stateParams.type || 'single';

    /*
     * If we are not logged -> redirect to home
     */
    if(session.getLogged() === false){
        $state.go('home');
    }

    /*
     * Load Current ID Blind
     */
    quizz.blindStart(type).then(function(id){
        $scope.blindId = id;
    });

    /*
     * Load questions Single/Multi
     */
    quizz.loadQuestions(type).then(function (result) {
        $scope.questions = result.questions;
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
     * Timer
     */
    $scope.countDown = config.timeMusic;
    $scope.percentCountDown = ($scope.countDown * 100) / config.timeMusic;

    $scope.$watch('countDown', function(newVal){
        $scope.percentCountDown = (newVal * 100) / config.timeMusic;
    });

    var timer = $interval(function(){
        $scope.countDown--;
    }, 1000);

    $scope.$watch('countDown', function(newVal){
       if(newVal == 0){
           $interval.cancel(timer);
           $scope.newQuestion(1, 1);
           console.log('Done');
       }
    });

    /*
     * Next Questions
     * TODO Move to Service
     */
    $scope.newQuestion = function (index, endTimer) {

        $interval.cancel(timer);
        $scope.countDown = config.timeMusic;

        var endTimer = endTimer || null;
        var question = $scope.questions[$scope.currentQuestion];

        console.log(question);

        if(endTimer == 1){
            $scope.responses[$scope.currentQuestion].value = 0;
            quizz.addResponse($scope.blindId, question.question.id);
            console.log('[QUIZZ] : Bad answer');
        }
        else{
            /* Good Answer with current Question */
            if (question.anwsers[index].status == 1) {
                $scope.responses[$scope.currentQuestion].value = 1;
                console.log('[QUIZZ] : Good answer');
            }
            else{
                $scope.responses[$scope.currentQuestion].value = 0;
                console.log('[QUIZZ] : Bad answer');
            }
            quizz.addResponse($scope.blindId, question.question.id, question.anwsers[index].id);
        }
        /* Check if last question */
        if($scope.currentQuestion == 19){
            $interval.cancel(timer);
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
            timer = $interval(function(){
                $scope.countDown--;
            }, 1000);
            $scope.currentQuestion++;
            console.log('[QUIZZ] : Next question : '+$scope.currentQuestion);
        }
    };

});