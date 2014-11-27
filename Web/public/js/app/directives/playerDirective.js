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

                var audio = $element[0];

                audio.pause();
                audio.setAttribute('src', newVal);
                audio.muted = false;
                audio.play();

            });
        }
    };
});