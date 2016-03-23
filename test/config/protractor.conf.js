'use strict';
var ScreenShotReporter = require('./jasmine2ScreenShotReporter'),
  JUnitXmlReporter = require('jasmine-reporters').JUnitXmlReporter,
  gulpConfig = require('../../gulp/config'),
  paths = gulpConfig.paths,
  minimist = require("minimist");

function initReporter() {
  jasmine.getEnv().addReporter(new ScreenShotReporter({dest: paths.reports + '/screenshots'}));
  jasmine.getEnv().addReporter(new JUnitXmlReporter({savePath: paths.reports + "/functionalBrowser",filePrefix: 'TEST-functional-browser'}));
}


function prepareTestEnv() {
  var suite = minimist(process.argv.slice(2)).suite;
  initReporter();
  browser.driver.manage().window().setSize(1400, 900);
}

var protractorConfig = {
  // NOTE If you want to use firefox install version 37 from http://download.cdn.mozilla.net/pub/mozilla.org/firefox/releases/37.0.2/
  // firefoxPath: '/data/home/rlorenz/opt/firefox37/firefox',
  capabilities: {
    browserName: 'chrome' // 'firefox'
  },
  suites: {
    functional: ['../functional/browser/**/*Spec.js']
  },
  rootElement: '#at-ng-root',
  framework: 'jasmine2',
  onPrepare: prepareTestEnv,
  jasmineNodeOpts: {
    isVerbose: false,
    defaultTimeoutInterval: 40000
  },
  getPageTimeout: 25000,
  allScriptsTimeout: 25000,
  debug: false,
  directConnect: true,
  plugins:[{
    inline:{
      onPageLoad:function(){
        var suite = minimist(process.argv.slice(2)).suite;
        if(suite === "functional"){
          require('./../support/injectMocks.js')();
        }
      }
    }
  }]
};


exports.config = protractorConfig;
