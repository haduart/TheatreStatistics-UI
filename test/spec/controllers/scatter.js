'use strict';

describe('Controller: ScatterCtrl', function () {

  // load the controller's module
  beforeEach(module('theatreStatisticsApp'));

  var ScatterCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ScatterCtrl = $controller('ScatterCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
