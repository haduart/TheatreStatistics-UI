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
      var dataset = [5, 10, 15, 20, 25];
      var multiplier = 8;
      var width = 400;
      var height = 300;

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
          return 300 - d * multiplier;
        })
        .attr('width', 20)
        .attr('height', function (d) {
          return d * multiplier;
        });
    }

    return {
      template: '',
      scope: {},
      restrict: 'E',
      link: link
    };
  });
