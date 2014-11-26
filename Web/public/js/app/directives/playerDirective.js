'use strict';

angular.module('app').directive('player', function(){
    return {
        restrict: 'E',
        template: '<audio id="player" src="" type="audio/mp3"></audio>',
        replace: true,
        scope: {
            src: '@'
        },
        link: function ($scope, $element, $attrs) {

            $attrs.$observe('src', function(newVal){
                $element[0].pause();
                $element[0].setAttribute('src', newVal);
                $element[0].muted = false;
                $element[0].play();
            });
        }
    };
});