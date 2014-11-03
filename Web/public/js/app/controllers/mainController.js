'use strict';

angular.module('app').controller('mainController', function($scope){
    $scope.$on('$viewContentLoaded', function(){
        console.log('Loaded');
    });
});