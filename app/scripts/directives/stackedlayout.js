'use strict';

/**
 * @ngdoc directive
 * @name theatreStatisticsApp.directive:stacked.layout
 * @description
 * # stacked.layout
 */
angular.module('theatreStatisticsApp')
  .directive('stackedLayout', function () {
    return {
      templateUrl: "/views/stacked-layout-view.html",
      restrict: 'E',
      controller: 'StackedLayoutControllerCtrl'
    };
  });
