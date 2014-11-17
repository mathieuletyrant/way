angular.module('filters', [])

.filter('pair', function(){
    return function (item) {
        return index++ % 2 == 1;
    };
});