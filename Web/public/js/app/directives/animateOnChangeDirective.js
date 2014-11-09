'use strict';

angular.module('app').directive('animateOnChange', function ($animate) {
    return {
        restrict: 'A',
        link: function (scope, elem, attr) {
            scope.$watch(attr.animateOnChange, function (newValue, oldValue) {
                if (newValue != oldValue) {
                    var c = newValue > oldValue ? 'change-up' : 'change';
                    $animate.addClass(elem, c, function () {
                        $animate.removeClass(elem, c);
                    });
                }
            });
        }
    }
});