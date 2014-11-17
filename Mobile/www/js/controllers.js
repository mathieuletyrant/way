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

    $scope.ready = false;

    api.goodDealPrimary(category).then(function(result){
        $scope.dealPrimary = result;
    });

    api.goodDealByCategory(category).then(function(result){
        $scope.deals = result;
        $scope.ready = true;
    });

})

/*
 * Deal CONTROLLER
 */
.controller('dealController', function($scope, $stateParams, $scope, $window, api, category){

    var id = $stateParams.id;

    $scope.ready = false; // Little Fix :)

    api.goodDealById(id).then(function(result){

        $scope.deal = result;
        $scope.ready = true;

        /*
         * Need Optimise this later
         */
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
        if($state.current.url == '/home'){
            $state.transitionTo('app.home', null, {'reload':true});
        }
        else{
            $state.go('app.home');
        }

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