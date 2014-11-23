'use strict';

angular.module('app').controller('profilController', function($scope, $state, apiUser, session, chart){

    /*
     * If we are not logged -> redirect to home
     */
    if(session.getLogged() === false || session.getUser().category_name == ""){
        $state.go('home');
    }
    else{
        $scope.user  = session.getUser();
        var data = [];
    }

    /*
     * Color for GoogleGraph
     */
    $scope.colors = chart.colors($scope.user.sex);

    /*
     * Get Percent for know category
     */
    apiUser.profilUser($scope.user.facebook_id, $scope.user.sex).then(function(result){
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