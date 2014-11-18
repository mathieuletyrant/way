'use strict';

angular.module('app').directive('player', function(){
    return {
        restrict: 'E',
        template: '<audio id="player" src="" type="audio/mp3"></audio>',
        replace: true,
        scope: {
            src: '='
        },
        link: function ($scope, $element, $attrs) {
            $scope.$watch($attrs.src, function(value) {
                $element[0].pause();
                $element[0].setAttribute('src',value.src);
                //$element[0].load();
                $element[0].play();
            });
        }
    };
});