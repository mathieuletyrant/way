'use strict';

angular.module('app').service('overlay', function(config){

    this.set = function (value) {
        config.overlay = value;
    }

    this.get = function () {
        return config.overlay;
    }

});