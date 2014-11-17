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
.controller('homeController', function($scope, api, category){

    var category = category.get();

    api.goodDealPrimary(category).then(function(result){
        $scope.dealPrimary = result;
    });

    api.goodDealByCategory(category).then(function(result){
        $scope.deals = result;
    });

})

/*
 * Deal CONTROLLER
 */
.controller('dealController', function($scope, $stateParams, $scope, $window, api){

    var id = $stateParams.id;

    api.goodDealById(id).then(function(result){

        $scope.deal = result;

        var mapOptions = {
                center: new google.maps.LatLng(result.lat,result.lng),
                zoom: 14,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                zoomControl: false,
                mapTypeControl: false
            },
            map = new google.maps.Map(document.getElementById("map"), mapOptions),
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(result.lat,result.lng),
                map: map,
                title: result.name
            });

    });

    $scope.openExternalMap = function(lat, lon){

        if(ionic.Platform.isIOS() || ionic.Platform.isIPad()){
            console.log('Launch External apps for maps');
            $window.location = "maps:daddr="+lat+","+lon;
        }
        else if(ionic.Platform.isAndroid()){
            console.log('Launch External apps for maps');
            cordova.require('cordova/plugin/phonenavigator').doNavigate(lat, lon, successFn, errorFn);
        }
        else{
            console.error("Unknown platform");
        }

    };

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
.controller('categoryController', function($scope, $state, category){

    $scope.getCategory = function () {
        return category.get();
    };

    $scope.setCategory = function (value) {
        category.set(value);
        $state.go('app.home');
    };

})

/*
 * Share CONTROLLER
 */
.controller('shareController', function($scope, share){

    $scope.share = function (social, text){
        social = social || 'facebook';
        share.seed(social, text);
    };

});