angular.module('controllers', []);

/*
 * GoodDeal CONTROLLER
 */
angular.controller('goodDealController', function($stateParams, $scope, api){

    var id = $stateParams.id; //

    api.goodDealById(id).then(function(result){
        $scope.result = result;
    }, function(result){
        console.log('Error during GoodDeal with ID : '+id+' : '+result);
    });

});

/*
 * Home CONTROLLER
 */
angular.controller('homeController', function($scope, api, config){

    api.goodDealByCategory(config.currentCategory).then(function(result){
        $scope.secondResult = result;
    }, function(result){
        console.log('Error during Home (Second) with CATEGORY : '+config.currentCategory+' : '+result);
    });

    api.goodDealPrimary(config.currentCategory).then(function(result){
        $scope.primaryResult = result;
    }, function(result){
        console.log('Error during Home (Primary) with CATEGORY : '+config.currentCategory+' : '+result);
    });

});