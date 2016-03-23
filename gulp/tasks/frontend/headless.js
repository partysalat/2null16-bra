/*jshint strict:false*/
var gulp     = require('gulp'),
  headless = require('headless'),
  util = require('gulp-util'),
  xvfb;

gulp.task('headless:start', function (done) {
  var options = {
    display: {
      width: 1200,
      height: 1000
    }
  };
  headless(options, 200, function (err, childProcess, servernum) {
    xvfb = childProcess;
    process.env.DISPLAY = ':'+servernum;
    typeof done==="function" && done();
  });
});

function stop(done) {
  if (xvfb) {
    xvfb.kill('SIGTERM', done);
  } else {
    typeof done==="function" && done();
  }
}

module.exports = {
  stop: stop
};
