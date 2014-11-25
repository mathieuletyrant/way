'use strict';

angular.module('app').filter('capitalize', function(){
   return function (string){
       return string.charAt(0).toUpperCase() + string.slice(1);
   };
});