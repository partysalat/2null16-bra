'use strict';
xdescribe('versionDirective', function() {

  var element, scope;

  beforeEach(function() {
    angular.mock.module('at-version');
  });

  it('is compiled', function() {
    compileDirective();
    expect(element.children().length > 0).toBeTruthy();
  });

  function compileDirective() {
    angular.mock.inject(function($rootScope, $compile) {
      scope = $rootScope.$new();
      element = $compile('<div data-version></div>')(scope);
      scope.$digest();
    });
  }
});
