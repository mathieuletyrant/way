'use strict';

angular.module('app').controller('quizzController', function ($scope, $stateParams, $state, $interval, quizz, config, session, api) {

    var type        = $stateParams.type || 'single',
        blind       = 'CREATED';

    /*
     * If we are not logged -> redirect to home
     */
    if(session.getLogged() === false){
        $state.go('home');
    }

    /*
     * Change status blind when change route
     */
    $scope.$on('$routeChangeSuccess', function() {
        if(blind === 'CREATED'){
            api.blindUpdate($scope.blindId, 'CANCEL');
        }
        else if(blind === 'FINISH'){
            api.blindUpdate($scope.blindId, blind);
        }
    });

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
            blind = 'FINISH';
            api.blindUpdate($scope.blindId, blind);
            console.log('[QUIZZ] : Challenge '+type+' done');
            if(type === 'single'){
                $state.go('profil');
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