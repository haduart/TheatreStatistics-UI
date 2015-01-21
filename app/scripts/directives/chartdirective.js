'use strict';

/**
 * @ngdoc directive
 * @name theatreStatisticsApp.directive:chartDirective
 * @description
 * # chartDirective
 */
angular.module('theatreStatisticsApp')
  .directive('d3Chart', function () {
    function link(scope, element, attrs) {
      //var dataset = [5, 10, 15, 20, 25];
      var dataset = _.map(_.range(30), function(i){
         return Math.random() * 50;
      });
      var multiplier = 8;
      var width = 400;
      var height = 300;

      var yScale = d3.scale.linear()
        .domain([0, d3.max(dataset) * 1.1])
        .range([0, height]);

      var svg = d3.select(element[0])
        .append('svg')
        .attr('width', width)
        .attr('height', 300);

      svg.selectAll('rect')
        .data(dataset)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', function (d, i) {
          return i * 22;
        })
        .attr('y', function (d) {
          return height - yScale(d);
        })
        .attr('width', 20)
        .attr('height', function (d) {
          return yScale(d);
        });
    }

    return {
      template: '',
      scope: {},
      restrict: 'E',
      link: link
    };
  });
