/*
 * THX : http://stackoverflow.com/questions/20789373/shuffle-array-in-ng-repeat-angular
 */
'use strict';

angular.module('app').filter('shuffle', function(){
    return function(array) {
        var m = array.length, t, i;

        // While there remain elements to shuffle
        while (m) {
            // Pick a remaining element…
            i = Math.floor(Math.random() * m--);

            // And swap it with the current element.
            t = array[m];
            array[m] = array[i];
            array[i] = t;
        }

        return array;
    };
});