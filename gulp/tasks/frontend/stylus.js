var gulp = require('gulp'),
    gulpConfig = require('../../config'),
    concat = require('gulp-concat'),
    bs = require("browser-sync"),
    stylus = require('gulp-stylus');



gulp.task('stylus', function () {
    return gulp.src([gulpConfig.paths.cssSource])
        .pipe(stylus({
            compress:true,
            'include css': true
        }))
        .pipe(concat("app.css"))
        .pipe(gulp.dest(gulpConfig.paths.assets))
      .on("end",bs.reload);
});

gulp.task('_watch:css', function () {
  return gulp
    .watch(
      [gulpConfig.paths.cssSource],
      ['stylus']
    );
});
gulp.task("copy-fonts",function(){
  return gulp.src(["./src/browser/styl/fontawesome/**/*","./src/browser/styl/dosis/**/*","./src/browser/styl/fonts/**/*"])
    .pipe(gulp.dest(gulpConfig.paths.assets))
});
gulp.task("copy-images",function(){
  return gulp.src(["./src/browser/styl/images/**/*"])
    .pipe(gulp.dest(gulpConfig.paths.assets))
});
gulp.task("css", ["stylus","copy-fonts","copy-images"]);