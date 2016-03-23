/*jshint strict:false*/
var gulpConfig = require('../../config'),
  gulp = require('gulp'),
  gutil = require("gulp-util"),
  webdriver = require('./webdriver');


gulp.task('_functional:browser', ['_functional:server:start', 'webdriver:update' ], function () {
  gutil.log(gutil.colors.green('FUNCTIONAL BROWSER STARTED'));
  return webdriver.runProtractorTests('functional', config.get('/baseUrl'));
});

gulp.task('_functional:browser:headless', ['headless:start',  '_functional:server:start', 'webdriver:update'], function () {
  gutil.log(gutil.colors.green('FUNCTIONAL BROWSER STARTED'));
  return webdriver.runProtractorTests('functional', config.get('/baseUrl'));
});


process.on('exit', webdriver.stopServer);
process.on('exit', webdriver.stopHeadless);