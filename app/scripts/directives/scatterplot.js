'use strict';

/**
 * @ngdoc directive
 * @name theatreStatisticsApp.directive:scatterplot
 * @description
 * # scatterplot
 */
angular.module('theatreStatisticsApp')
  .directive('scatterPlot', function () {
    return {
      templateUrl: "/views/scatterplot.html",
      restrict: 'E',
      controller: 'ScatterplotcontrollerCtrl'
    };
  });
