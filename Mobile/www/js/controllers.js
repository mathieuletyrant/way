angular.module('controllers', [])

/*
 * GoodDeal CONTROLLER
 */
.controller('goodDealController', function($stateParams, $scope, api){

    var id = $stateParams.id;

    api.goodDealById(id).then(function(result){
        $scope.result = result;
    }, function(result){
        console.log('Error during GoodDeal with ID : '+id+' : '+result);
    });

})

/*
 * Home CONTROLLER
 */
.controller('homeController', function($scope, api, config){

    var page = 1;

    api.goodDealByCategory(config.currentCategory, 1).then(function(result){
        $scope.secondResult = result;
    }, function(result){
        console.log('Error during Home (Second) with CATEGORY : '+config.currentCategory+' : '+result);
    });

    api.goodDealPrimary(config.currentCategory).then(function(result){
        $scope.primaryResult = result;
    }, function(result){
        console.log('Error during Home (Primary) with CATEGORY : '+config.currentCategory+' : '+result);
    });

    $scope.loadMore = function(){
        page++;
        api.goodDealByCategory(config.currentCategory, page).then(function(result){
            $scope.secondResult.push(result);
        }, function(result){
            console.log('Error during Home (Second) with CATEGORY : '+config.currentCategory+' : '+result);
        });
    }

})

/*
 * Overlay CONTROLLER
 */
.controller('overlayController', function($scope, overlay){

    $scope.getOverlay = function () {
        return overlay.get();
    };

    $scope.setOverlay = function (value) {
        overlay.set(value);
    };

})

/*
 * Category CONTROLLER
 */
.controller('categoryController', function($scope, category){

    $scope.getCategory = function () {
        return category.get();
    };

    $scope.setCategory = function (value) {
        category.set(value);
    };

});