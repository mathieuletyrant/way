'use strict';

angular.module('app').service('defi', function($q, $interval){

    var vitesse = 200;

    /*
     * Function Animation With Interval
     */
    var animePoint = function (points, span){

        var deferred    = $q.defer();

        var ct  = 0;

        var interval = $interval(function(){
            if(ct < points) {
                ct++;
                span.innerHTML = ct;
            }else {
                deferred.resolve(true);
                $interval.cancel(interval);
            }
        }, vitesse);

        return deferred.promise;

    };

    /*
     * Call wi Service and seed promise when the biggest number animation is done
     */
    this.animation = function() {
        if(document.querySelectorAll('.total_point')) {
            var span        = document.querySelectorAll('.total_point');
            var deferred    = $q.defer();

            if(span[0].getAttribute('data-point') > span[1].getAttribute('data-point')){
                animePoint(span[1].getAttribute('data-point'), span[1]);
                animePoint(span[0].getAttribute('data-point'), span[0]).then(function(){
                   deferred.resolve(true);
                });
            }
            else {
                animePoint(span[0].getAttribute('data-point'), span[0]);
                animePoint(span[1].getAttribute('data-point'), span[1]).then(function(){
                    deferred.resolve(true);
                });
            }

            return deferred.promise;
        }
    };

});