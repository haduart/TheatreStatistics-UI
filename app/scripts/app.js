'use strict';

/**
 * @ngdoc overview
 * @name theatreStatisticsApp
 * @description
 * # theatreStatisticsApp
 *
 * Main module of the application.
 */
angular
  .module('theatreStatisticsApp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/stacked-chart', {
        templateUrl: 'views/stackedview.html',
        controller: 'ChartCtrl'
      })
      .when('/scatter-chart', {
        templateUrl: 'views/scatterview.html',
        controller: 'ScatterCtrl'
      })
      .when('/chart', {
        templateUrl: 'views/chart.html',
        controller: 'ScatterCtrl'
      })
      .when('/settings', {
        templateUrl: 'views/settings.html',
        controller: 'SettingsCtrl'
      })
      .otherwise({
        redirectTo: '/stacked-chart'
      });
  });
