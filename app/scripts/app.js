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
      .when('/chart', {
        templateUrl: 'views/chart.html',
        controller: 'ChartCtrl'
      })
      .when('/settings', {
        templateUrl: 'views/settings.html',
        controller: 'SettingsCtrl'
      })
      .otherwise({
        redirectTo: '/chart'
      });
  });
