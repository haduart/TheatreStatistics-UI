'use strict';

describe('Directive: stacked.layout', function () {

  // load the directive's module
  beforeEach(module('theatreStatisticsApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<stacked.layout></stacked.layout>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the stacked.layout directive');
  }));
});
