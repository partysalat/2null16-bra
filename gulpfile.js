var
  gulp = require('gulp'),
  sequence = require('run-sequence'),
  requireDir = require('require-dir');

requireDir('./gulp/tasks', {
  recurse: true
});

gulp.task('clean', ['_clean']);

gulp.task('lint', ['_lint']);

gulp.task('unit', function(done){
  sequence(
    ['_env:set_development','_clean:assets'],
    ['_scripts','_unit:server'],
    '_unit:browser:once',
    done
  );
});

gulp.task('integration', function(done){
  sequence(
    '_env:set_development',
    '_integration',
    done
  );
});

gulp.task('functional', function(done){
  sequence(
    ['_env:set_test','_clean:assets'],
    ['_scripts:copy_mocks',"_scripts"],
    '_functional:browser',
    done
  );
});

gulp.task('smoke', ['_smoke']);

gulp.task('run', function (done) {
  sequence(
    ['_env:set_development','_clean:assets'],
    '_scripts',
    '_server',
    done
  );
});

gulp.task('build', function (done) {
  sequence(
    '_env:set_test',
    ['_lint:fail','_clean:assets'],
    ['_scripts',"css"],
    '_unit:server:fail',
    //'_unit:browser:once',
    '_integration',
    '_functional:server',
 //   '_scripts:copy_mocks',
 //   '_functional:browser:headless',
    done
  );
});

gulp.task('test', ['build']);

gulp.task('default', function(done){
  sequence(
    ['_env:set_development','_clean:assets'],
    ['_scripts:watch',"css","_watch:css"],
    '_watch',
    '_server',
    ['_lint', '_unit:server','_unit:browser:watch'],
    done
  )

});