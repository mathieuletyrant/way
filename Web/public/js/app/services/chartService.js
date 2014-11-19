'use strict';

angular.module('app').service('chart', function () {

    this.colors = function () {
        return [
            {
                category: 'geek',
                color: 'red',
                chartColor: '#F7464A',
                highlight: '#FF5A5E'
            },
            {
                category: 'dragqueen',
                color: 'blue',
                chartColor: "#46BFBD",
                highlight: "#5AD3D1"
            },
            {
                category: 'hipster',
                color: 'gray',
                chartColor: "#949FB1",
                highlight: "#A8B3C5"
            },
            {
                category: 'badboy',
                color: 'black',
                chartColor: "#4D5360",
                highlight: "#616774"
            },
            {
                category: 'keke',
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