angular.module('app').controller('blindTestController', function($scope, $http){

    $http({
        method: 'GET',
        url: 'http://wayapi.mathieuletyrant.com/blind/generate/single/male?callback=JSON_CALLBACK'
    })
    .success(function(result){
    	console.log(result);
    })
    .error(function(result){
    	console.log("Erreur :"+result);
    });

});