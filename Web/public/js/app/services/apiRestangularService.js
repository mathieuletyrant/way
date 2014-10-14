angular.module('app').factory('apiRestangular', function(Restangular, config){

    /*
     Return Config for Way API
     */
    return Restangular.withConfig(function (RestangularConfigurer) {
        RestangularConfigurer.setBaseUrl(config.apiUrl);
        RestangularProvider.setDefaultHeaders({token: config.token});
    });

});