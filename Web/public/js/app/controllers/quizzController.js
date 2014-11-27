'use strict';

angular.module('app').controller('quizzController', function ($rootScope, $scope, $timeout, $stateParams, $state, $interval, $filter, quizz, config, session, apiBlind, apiUser, apiNotification, alert) {

    var type        = $stateParams.type || null,
        blindId     = $stateParams.blindId,
        blind       = 'CREATED',
        timer;

    /*
     * If we are not logged -> redirect to home
     */
    if(session.getLogged() === false || ($stateParams.type == 'multi' && ($stateParams.user_1 == $stateParams.user_2)) || type == null){
        alert.call('Veuillez vous connecter via facebook afin de participer à l\'expérience Way.');
        $state.go('home');
        return;
    }

    /*
     * Change status blind when change route
     */
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
        if(fromState.name == 'quizz'){
            if(blind === 'CREATED'){
                apiBlind.blindUpdate($scope.blindId, 'CANCEL');
            }
            else if(blind === 'FINISH'){
                apiBlind.blindUpdate($scope.blindId, blind);
            }
        }
    });

    /*
     * Load Current ID Blind
     */
    if(blindId == 0){
        console.log('ici');
        quizz.blindStart(type).then(function(id){
            $scope.blindId = id;
        });
    }
    else{
        $scope.blindId = blindId;
    }


    /*
     * Load questions Single/Multi
     */
    quizz.loadQuestions(type, $stateParams.category, blindId).then(function (result) {
        if($stateParams.type == 'single'){
            $scope.questions = result.questions;
        }
        else if($stateParams.type == 'multi' && blindId == 0){
            $scope.questions = result;
        }
        else{
            $scope.questions = result.questions;
        }
        // Shuffle
        for(var i = 0; i < $scope.questions.length; i++){
            $filter('shuffle')($scope.questions[i].answers);
        }
        // Start Timer when questions loaded
        timer = $interval(function(){
            $scope.countDown--;
        }, 1000);
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
            quizz.addResponse($scope.blindId, session.getUser().facebook_id, question.question.id);
            console.log('[QUIZZ] : Bad answer');
        }
        else{
            /* Good Answer with current Question */
            if (question.answers[index].status == 1) {
                $scope.responses[$scope.currentQuestion].value = 1;
                console.log('[QUIZZ] : Good answer');
            }
            else{
                $scope.responses[$scope.currentQuestion].value = 0;
                console.log('[QUIZZ] : Bad answer');
            }
            quizz.addResponse($scope.blindId, session.getUser().facebook_id, question.question.id, question.answers[index].id);
        }
        /* Check if last question */
        if($scope.currentQuestion == 19){
            $interval.cancel(timer);
            blind = 'FINISH';
            apiBlind.blindUpdate($scope.blindId, blind).then(function(){
                console.log('[QUIZZ] : Challenge '+type+' done');
                if(type === 'single'){
                    apiUser.profilUser(session.getUser().facebook_id, session.getSexe()).then(function(result){
                        var newCategory = result.user.profil;
                        apiUser.userCategory(session.getUser().facebook_id, newCategory).then(function(){
                            session.setCategory(newCategory);
                            $state.go('profil');
                        });
                    });
                }
                else{
                    if(blindId == 0){
                        apiNotification.addNotification($stateParams.user_2, 'START_DUEL', $stateParams.user_1, $stateParams.user_2, $scope.blindId, null, $stateParams.category).then(function(){
                            alert.call('Veuillez attendre que la personne défiée finisse son test.');
                            $state.go('home');
                        });
                    }
                    else{ // It's the second user for response
                        apiNotification.addNotification($stateParams.user_1, 'END_DUEL', $stateParams.user_1, $stateParams.user_2, $scope.blindId, null, $stateParams.category).then(function(){
                            apiNotification.addNotification($stateParams.user_2, 'END_DUEL', $stateParams.user_1, $stateParams.user_2, $scope.blindId, null, $stateParams.category).then(function(){
                                alert.call('Merci de vérifier vos notifications pour voir le résultat.');
                                $state.go('home');
                            });
                        });
                    }
                }
            });
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