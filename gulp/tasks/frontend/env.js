'use strict';

var config = require('../../config'),
  gutil = require('gulp-util'),
  _ = require('lodash'),
  argv = require('minimist')(process.argv.slice(2)),
  gulp = require('gulp');

var isEnvSet = false;

gulp.task('_env:set_test', function(done) {
  if (!isEnvSet) {
    gutil.log('Use', gutil.colors.green('test'), 'environment.');
    config.env.test = true;
    config.env.name = 'test';
    config.minified = isMinified(true);
    isEnvSet = true;
  }

  return done();
});

gulp.task('_env:set_development', function(done) {
  if (!isEnvSet) {
    gutil.log('Use', gutil.colors.green('development'), 'environment.');
    config.env.development = true;
    config.env.name = 'development';
    config.minified = isMinified(false);
    isEnvSet = true;
  }

  return done();
});

function isMinified(defaultValue) {
  var isMinified = defaultValue;
  if (argv.minified !== undefined) {
    isMinified = argv.minified == 'true';
  }

  var value = isMinified ? 'minified' : 'exploded';
  gutil.log('Use', gutil.colors.green(value), ' javascript. (You can overload it with --minified=true|false)');
  return isMinified;
}
