'use strict';

describe('Controller: StackedCtrl', function () {

  // load the controller's module
  beforeEach(module('theatreStatisticsApp'));

  var StackedCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    StackedCtrl = $controller('StackedCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
