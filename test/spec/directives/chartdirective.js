'use strict';

describe('Directive: chartDirective', function () {

  // load the directive's module
  beforeEach(module('theatreStatisticsApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<chart-directive></chart-directive>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the chartDirective directive');
  }));
});
