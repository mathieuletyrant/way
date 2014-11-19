'use strict';

angular.module('app').controller('profilController', function($scope, api, session){

    /*
     * If we are not logged -> redirect to home
     */
    if(session.getLogged() === false){
        $state.go('home');
    }
    else{
        $scope.user  = session.getUser();
    }

    /*
     * Color for GoogleGraph
     */
    $scope.colors = ['red', 'black', 'yellow', 'blue', 'gray'];

    /*
     * Get Percent for know category
     */
    api.profilUser($scope.user.facebook_id, $scope.user.sex).then(function(result){
        $scope.userInformations = result.user;
        console.log(result);
    });

});