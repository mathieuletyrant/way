'use strict';

angular.module('app').controller('quizzController', function ($rootScope, $scope, $stateParams, $state, $interval, quizz, config, session, api) {

    var type        = $stateParams.type || null,
        blindId     = $stateParams.blindId,
        blind       = 'CREATED';

    /*
     * If we are not logged -> redirect to home
     */
    if(session.getLogged() === false || ($stateParams.type == 'multi' && ($stateParams.user_1 == $stateParams.user_2)) || type == null){
        $state.go('home');
    }

    /*
     * Change status blind when change route
     */
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
        if(fromState.name == 'quizz'){
            if(blind === 'CREATED'){
                api.blindUpdate($scope.blindId, 'CANCEL');
            }
            else if(blind === 'FINISH'){
                api.blindUpdate($scope.blindId, blind);
            }
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
    quizz.loadQuestions(type, $stateParams.category, blindId).then(function (result) {
        if($stateParams.type == 'single'){
            $scope.questions = result.questions;
        }
        else if($stateParams.type == 'multi' && $stateParams.blindId == 0){
            $scope.questions = result;
        }
        else{
            $scope.questions = result.questions;
        }
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
                api.profilUser(session.getUser().facebook_id, session.getSexe()).then(function(result){
                    var newCategory = result.user.profil;
                    api.userCategory(session.getUser().facebook_id, newCategory).then(function(){
                        session.setCategory(newCategory);
                        $state.go('profil');
                    });
                });
            }
            else{
                api.addNotification(session.getUser().facebook_id, $stateParams.user_2, $scope.blindId).then(function(){
                    $state.go('profil');
                });
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