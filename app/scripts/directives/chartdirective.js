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

      var dataset = _.map(_.range(25), function (i) {
        return Math.random() * 50;
      });

      var margin = {top: 25, right: 0, bottom: 20, left: 40};

      var multiplier = 8;
      var width = 500 - margin.left - margin.right;
      var height = 300 - margin.top - margin.bottom;

      var maxValue = d3.max(dataset);

      var yScale = d3.scale.linear()
        .domain([0, maxValue * 1.1])
        .range([0, height]);

      var colorScale = d3.scale.linear()
        .domain([0, maxValue])
        .range(['red', 'green']);

      var quantileColorScale = d3.scale.quantile()
        .domain([0, (maxValue * 10 / 100), maxValue - (maxValue * 10 / 100), maxValue])
        .range(['red', 'green', 'yellow']);


      var xScale = d3.scale.ordinal()
        .domain(dataset)
        .rangeBands([0, width], 0.1, 0.3);

      var svg = d3.select(element[0])
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

      svg.selectAll('rect')
        .data(dataset)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', xScale)
        .attr('y', function (d) {
          return height - yScale(d);
        })
        .attr('width', xScale.rangeBand())
        .attr('height', yScale)
        .attr('fill', colorScale);

    }

    return {
      template: '',
      scope: {},
      restrict: 'E',
      link: link
    };
  });
