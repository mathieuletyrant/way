'use strict';

angular.module('app').filter('trusted', function($sce){
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
});