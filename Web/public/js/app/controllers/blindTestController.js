'use strict';

angular.module('app').controller('blindTestController', function($scope, api){

    api.single('mal').then(function(result){
       $scope.blind = result;
    });

});