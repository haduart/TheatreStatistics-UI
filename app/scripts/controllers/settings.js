'use strict';

/**
 * @ngdoc function
 * @name theatreStatisticsApp.controller:SettingsCtrl
 * @description
 * # SettingsCtrl
 * Controller of the theatreStatisticsApp
 */
angular.module('theatreStatisticsApp')
  .controller('SettingsCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.categories=[
      {'id': 0, 'name': 'Chart #1', 'href': '#/stacked-chart'},
      {'id': 1, 'name': 'Chart #2', 'href': '#/scatter-chart'},
      {'id': 2, 'name': 'Chart #3', 'href': '#/chart'},
      {'id': 3, 'name': 'Settings', 'href': '#/settings'}];
  });
