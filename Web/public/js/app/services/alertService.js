'use strict';

angular.module('app').service('alert', function($timeout){

    /*
     * @name Call a JS
     * @param string message
     */
    this.call = function (message) {
      $timeout(function(){
          alert(message);
      }, 500);
    };

});