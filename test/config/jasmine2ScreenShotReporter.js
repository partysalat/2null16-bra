'use strict';
var fs     = require('fs'),
    mkdirp = require('mkdirp'),
    _      = require('lodash');

function Jasmine2ScreenShotReporter(opts) {

  var suites       = {},   // suite clones
      specs        = {},   // tes spec clones
      runningSuite = null; // currently running suite

  // write data into opts.dest as filename
  var writeScreenshot = function (data, filename) {
    var stream = fs.createWriteStream(opts.dest + filename);
    stream.write(new Buffer(data, 'base64'));
    stream.end();
  };

  // returns suite clone or creates one
  var getSuiteClone = function(suite) {
    suites[suite.id] = _.extend((suites[suite.id] || {}), suite);
    return suites[suite.id];
  };

  // returns spec clone or creates one
  var getSpecClone = function(spec) {
    specs[spec.id] = _.extend((specs[spec.id] || {}), spec);
    return specs[spec.id];
  };

  // TODO: more options
  opts          = opts || {};
  opts.dest     = (opts.dest || 'target/screenshots') + '/';
  opts.filename = opts.filename || 'report.html';
  opts.ignoreSkippedSpecs = opts.ignoreSkippedSpecs || false;
  opts.captureOnlyFailedSpecs = opts.captureOnlyFailedSpecs || false;


  this.jasmineStarted = function() {
    mkdirp(opts.dest, function(err) {
      var files;

      if(err) {
        throw new Error('Could not create directory ' + opts.dest);
      }

      files = fs.readdirSync(opts.dest);

      _.each(files, function(file) {
        var filepath = opts.dest + file;
        if (fs.statSync(filepath).isFile()) {
          fs.unlinkSync(filepath);
        }
      });
    });
  };

  this.suiteStarted = function(suite) {
    suite = getSuiteClone(suite);
    suite._suites = [];
    suite._specs = [];
    suite._started = Date.now();
    suite._parent = runningSuite;

    if (runningSuite) {
      runningSuite._suites.push(suite);
    }

    runningSuite = suite;
  };

  this.suiteDone = function(suite) {
    suite = getSuiteClone(suite);
    suite._finished = Date.now();
    runningSuite = suite._parent;
  };

  this.specStarted = function(spec) {
    spec = getSpecClone(spec);
    spec._started = Date.now();
    spec._suite = runningSuite;
    runningSuite._specs.push(spec);
  };

  this.specDone = function(spec) {
    spec = getSpecClone(spec);
    spec._finished = Date.now();

    // Don't screenshot skipped specs
    var isSkipped = opts.ignoreSkippedSpecs && spec.status === 'pending';
    // Screenshot only for failed specs
    var isIgnored = opts.captureOnlyFailedSpecs && spec.status !== 'failed';

    if (isSkipped || isIgnored) {
      _.pull(runningSuite._specs, spec);
      return;
    }

    browser.takeScreenshot().then(function (png) {
      browser.getCapabilities().then(function () {
        // TODO: capabilities.browserName
        if(spec.status !== "passed"){
          spec.filename = spec.status + '-' + spec.fullName + '.png';
          writeScreenshot(png, spec.filename);
        }
      });
    });
  };
}

module.exports = Jasmine2ScreenShotReporter;

