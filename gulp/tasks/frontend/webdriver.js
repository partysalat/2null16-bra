/*jshint strict:false*/
var config = require('../../config'),
  paths = config.paths,
  gulp = require('gulp'),
  protractor = require('gulp-protractor').protractor,
  webdriver_update = require('gulp-protractor').webdriver_update,
  util = require('gulp-util'),
  server = require('gulp-develop-server');

function stopHeadless(done) {
  require('./headless').stop(done || function () {
  });

}
function stopServer(done) {
  if (server) {
    server.kill('SIGTERM', typeof done==="function" ? done: util.noop);
    server = undefined;
  }
}
function handleError(){
  this.emit('end',1);

  if (!config.env.development) {
    process.exit(1);
  }
}
function runProtractorTests(suite, baseUrl) {
  var protractorConfig = config.paths.test.config + "/protractor.conf.js";

  return gulp.src(['i_do_not_exist.'], {read: false})
    .pipe(protractor({
      configFile: protractorConfig,
      args: ['--suite', suite, '--baseUrl', baseUrl]
    }))
    .on('error', handleError)
    .on("end",function () {
      stopServer();
      stopHeadless();
    })
}

gulp.task('webdriver:update', function (done) {
  webdriver_update({browsers: ['firefox', 'chrome']}, done);
});

module.exports = {
  runProtractorTests:runProtractorTests,
  stopServer:stopServer,
  stopHeadless:stopHeadless
};