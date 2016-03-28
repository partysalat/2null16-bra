var gulp = require("gulp"),
  watchify = require("watchify"),
  browserify = require("browserify"),
  source = require('vinyl-source-stream'),
  mergeStream = require('merge-stream'),
  gutil = require('gulp-util'),
  concat = require('gulp-concat'),
  _ = require("lodash"),
  remember = require("gulp-remember"),
  cache = require("gulp-cached"),
  buffer = require('vinyl-buffer'),
  jade = require('gulp-jade'),
  gulpIf = require('gulp-if'),
  bs = require("browser-sync"),
  sourcemaps = require("gulp-sourcemaps"),
  uglify = require("gulp-uglify"),
  browserLibraries = require("./../../../package.json").browserLibraries,
  externalLibraries = require("./../../../package.json").externalLibraries,
  templateCache = require('gulp-angular-templatecache');


var config = require("./../../config"),
  localConfig = require("./../../../localConfig");
var customOpts = {
  entries: config.bundleEntries
};

var appBundler, vendorBundler;

gulp.task("_scripts:vendor", function () {
    vendorBundler = browserify({
      entries: config.vendorEntries
    });
    vendorBundler.on('log', gutil.log);
    var rev = require("gulp-hash");
    var browserLibraryStreamSources = browserLibraries || [];
    var browserLibraryStream = gulp.src(browserLibraryStreamSources).pipe(concat('browserLibs.js'));

    (externalLibraries||[]).forEach(function(moduleName){
        vendorBundler.require(moduleName)
    });

    var browserifyStream = vendorBundler.bundle()
      .on('error', gutil.log.bind(gutil, 'Browserify Error'))
      .pipe(source(localConfig.bundle.vendor))
      .pipe(buffer())
      .on('error', gutil.log);
    var concatStream = mergeStream(browserifyStream, browserLibraryStream);

    return concatStream
      .pipe(concat(localConfig.bundle.vendor))
      .pipe(gulpIf(config.minified, rev()))
      .pipe(gulpIf(config.minified, uglify()))
      .pipe(gulp.dest(config.paths.assets))
      .pipe(rev.manifest("rev-manifest.json", true))
      .pipe(gulp.dest('./src/server/config'));
  }
);

gulp.task('_scripts:copy_mocks', function() {
  return gulp.src([
    //Add your mocks here!
  ])
    .pipe(gulp.dest(config.paths.assets));
});

gulp.task("_scripts:app-watch", function () {
  customOpts.debug = !config.minified;
  var opts = _.assign({}, watchify.args, customOpts);
  appBundler = watchify(browserify(opts));
  appBundler.on('update', bundleApp);
  appBundler.on('log', gutil.log);
  addMinifiedOptions(appBundler);

    (externalLibraries||[]).forEach(function(moduleName){
        appBundler.external(moduleName);
    });
  gulp.watch([
    config.paths.browserSource + '/templates/**/[!_]*.jade',
    config.paths.browserSource + '/**/[!_]*.jade'], bundleApp);
  return bundleApp();
});

gulp.task("_scripts:app", function () {
  customOpts.debug = !config.minified;
  appBundler = browserify(customOpts);
  addMinifiedOptions(appBundler);
    (externalLibraries||[]).forEach(function(moduleName){
        appBundler.external(moduleName);
    });
  appBundler.on('log', gutil.log);
  return bundleApp();
});

gulp.task("_scripts", ["_scripts:app", "_scripts:vendor"]);

gulp.task("_scripts:watch", ["_scripts:app-watch", "_scripts:vendor"]);


function addMinifiedOptions(bundler){
  if (config.minified) {
    bundler.transform({
        global: true
      }, 'uglifyify'
    )
  }
}


function bundleApp() {
  var appStream = appBundler.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('tmp.js'))
    .pipe(buffer())
    .pipe(gulpIf(!config.minified,sourcemaps.init({loadMaps: true})))
    .on('error', gutil.log);


  var templateStream = bundleTemplateCache();
  var rev = require("gulp-hash");
  return mergeStream(appStream, templateStream)
    .pipe(concat(localConfig.bundle.app))
    .pipe(gulpIf(!config.minified,sourcemaps.write()))
    .pipe(gulpIf(config.minified, rev()))
    .pipe(gulp.dest('./target/assets'))
    .pipe(rev.manifest("rev-manifest.json", true))
    .pipe(gulp.dest('./src/server/config'))
    .on("end",bs.reload);
}

function bundleTemplateCache() {
  return gulp
    .src([
      config.paths.browserSource + '/templates/**/[!_]*.jade',
      config.paths.browserSource + '/**/[!_]*.jade'])
    .pipe(cache('angularJadeTemplates'))
    .pipe(jade())
    .on('error', gutil.log)
    .pipe(remember('angularJadeTemplates'))
    .pipe(templateCache({
      module: 'templates',
      standalone: true,
      transformUrl: function (url) {
        return url.replace(/.*\//, '')
      }
    }))
}