'use strict';
describe('index header and footer', function () {

  var indexPage = require('../../../pageObjects/indexPage');

  beforeAll(function () {
    indexPage.get();
  });

  it('header should be visible', function () {
    expect(indexPage.header.isPresent()).toBeTruthy();
  });

  it('footer should be visible', function () {
    expect(indexPage.footer.isPresent()).toBeTruthy();
  });
});