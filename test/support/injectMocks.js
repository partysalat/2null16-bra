'use strict';
var fs = require('fs'),
    config = require("./../config/functionalConfig");

var scripts;
module.exports = function () {
  if(!scripts){
    scripts = config.mocks
      .map(function (fileName) {
        return fs.readFileSync(fileName, 'utf8');
      });
  }
  scripts.forEach(browser.executeScript);
};