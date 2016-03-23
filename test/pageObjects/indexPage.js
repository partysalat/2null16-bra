'use strict';
function IndexPage() {
  this.header = element(by.css('.at-header'));
  this.footer = element(by.css('.at-page-footer'));

  this.get = function() {
    return browser.get(browser.baseUrl);
  };
}

module.exports = new IndexPage();
