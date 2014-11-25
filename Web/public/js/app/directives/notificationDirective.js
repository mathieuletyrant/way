'use strict';

angular.module('app').directive('notification', function(){
	return {
        restrict   : 'E',
        templateUrl: 'templates/modules/notification.html'
    };
});