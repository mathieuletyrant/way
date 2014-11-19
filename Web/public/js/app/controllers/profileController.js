'use strict';

angular.module('app').controller('profilController', function($scope, $state, api, session, chart){

    /*
     * If we are not logged -> redirect to home
     */
    if(session.getLogged() === false){
        $state.go('home');
    }
    else{
        $scope.user  = session.getUser();
        var data = [];
    }

    /*
     * Color for GoogleGraph
     */
    $scope.colors = chart.colors();

    /*
     * Get Percent for know category
     */
    api.profilUser($scope.user.facebook_id, $scope.user.sex).then(function(result){
        $scope.userInformations = result.user;

        var j = 0;

        for(var i in result.user.total){
            //console.log('category:'+$scope.colors[j].category+'value:'+result.user.total[i]+'color:'+$scope.colors[j].color);
            data.push({
                value: result.user.total[i],
                color: $scope.colors[j].chartColor,
                highlight: $scope.colors[j].highlight,
                label: $scope.colors[j].category
            });
            j++;
        }

        /*
         * Create Graph
         */
        chart.create(data);
    });

});