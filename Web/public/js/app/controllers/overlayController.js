'use strict';

angular.module('app').controller('overlayController', function($scope, config, overlay){

    $scope.getOverlay = function () {
        return overlay.get();
    };

    $scope.setOverlay = function (value) {
        overlay.set(value);
    };

});