'use strict';

describe('Controller: ScatterplotcontrollerCtrl', function () {

  // load the controller's module
  beforeEach(module('theatreStatisticsApp'));

  var ScatterplotcontrollerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ScatterplotcontrollerCtrl = $controller('ScatterplotcontrollerCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
