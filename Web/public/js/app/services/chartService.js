'use strict';

angular.module('app').service('chart', function () {

    this.colors = function (sexe) {
        return [
            {
                category: (sexe == "male") ? 'geek' : 'barbie',
                color: 'red',
                chartColor: '#F7464A',
                highlight: '#FF5A5E'
            },
            {
                category: (sexe == "male") ? 'dragqueen' : 'badgirl',
                color: 'blue',
                chartColor: "#46BFBD",
                highlight: "#5AD3D1"
            },
            {
                category: (sexe == "male") ? 'hipster' : 'fleurbleue',
                color: 'gray',
                chartColor: "#949FB1",
                highlight: "#A8B3C5"
            },
            {
                category: (sexe == "male") ? 'badboy' : 'geekette',
                color: 'black',
                chartColor: "#4D5360",
                highlight: "#616774"
            },
            {
                category: (sexe == "male") ? 'keke' : 'hippie',
                color: 'yellow',
                chartColor: '#FDB45C',
                highlight: '#FFC870'
            }
        ];
    };

    this.create = function (data) {
        var options = {
            animationEasing: "easeOutQuart",
            segmentStrokeColor: "#fff"
        };
        var ctx = document.getElementById("chart").getContext("2d");
        var chart = new Chart(ctx).PolarArea(data, options);
    };
});