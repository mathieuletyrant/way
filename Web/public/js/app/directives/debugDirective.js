'use strict';

/*
    Usage : <debug value=""></debug>
 */
angular.module('app').directive('debug', function () {
    return {
        restrict: 'E',
        scope   : {
            expression: '=value'
        },
        template: '<pre>{{debug(expression)}}</pre>',
        link    : function (scope) {
            scope.debug = function (exp) {
                return angular.toJson(exp, true);
            };
        }
    }
});