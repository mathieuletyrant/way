angular.module('app').factory('apiRestangular', function (Restangular, config) {

    /*
     Return Config for Way API
     */
    return Restangular.withConfig(function (RestangularConfigurer) {
        RestangularConfigurer.setBaseUrl(config.apiUrl);
        RestangularConfigurer.setDefaultHeaders({token: config.token});
    });

});