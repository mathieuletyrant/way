'use strict';

angular.module('app').filter('bool', function () {
    return function (input, valueTrue, valueFalse) {
        return input !== true ? valueFalse : valueTrue;
    };
});