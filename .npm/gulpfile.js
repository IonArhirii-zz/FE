/* jshint node: true */

'use strict';

var gulp = require('gulp');
var config = require("./example.config");

/**
 * Include Gulp plugins
 */
var $ = require("gulp-load-plugins")({
  pattern: ['gulp-*', 'gulp.*'],
  replaceString: /\bgulp[\-.]/
});
var fs = require("fs");
var moduleImporter = require('sass-module-importer');
var browserSync = require('browser-sync').create();
var del = require('del');
var kss = require('kss');


/**
 * If config.js exists, load that config for overriding certain values below.
 */
function loadConfig() {
  if (fs.existsSync(__dirname + "/./config.js")) {
    config = {};
    config = require("./config");
  }

  return config;
}

loadConfig();

gulp.task('clean', function (cb) {
  del(cb);
});

/**
 * CSS from all SCSS.
 */
gulp.task('sass', function () {
  del(['../css/*.css', '../css/*.css.map'], {force: true});

  return gulp.src('../_components/**/*.scss')
      .pipe($.sourcemaps.init())
      .pipe($.sass({
        importer: moduleImporter(),
        importOnce: {
          index: false,
          css: false,
          bower: false
        },
        indentedSyntax: true,
        noCache: false,
        lineNumbers: false,
        sourceMap: true,
        outputStyle: "expanded"
      }))
      .on('error', function (error) {
        $.util.log(error);
        this.emit('end');
      })
      .pipe($.base64())
      .pipe($.autoprefixer(config.autoprefixerOptions))
      .pipe($.sourcemaps.write())
      .pipe(gulp.dest('../css'));
});

/**
 * Concat javascript.
 */
gulp.task('compress', function () {
  del(['../js/*.js', '../js/*.js.map'], {force: true});

  return gulp.src([
    '../_js-src/**/*.js',
    '../_components/**/*.js'
  ])
      .pipe($.sourcemaps.init())
      .pipe($.uglify())
      .on('error', function (error) {
        $.util.log(error);
        this.emit('end');
      })
      .pipe($.concat('scripts.js'))
      .pipe($.sourcemaps.write())
      .pipe(gulp.dest('../js'));
});

gulp.task('html', function(){
  var twig = require('gulp-twig');
  gulp.src(['../templates/*.twig'])
    .pipe(twig({
      getIncludeId: function(filePath) {
        return path.relative('../templates', filePath);
      }
    }))
    .pipe(gulp.dest('../'));
});

/**
 * Browser Sync.
 */
gulp.task('browser-sync', function () {
  browserSync.init({
    proxy: config.browserSync.hostname,
    port: config.browserSync.port,
    open: config.browserSync.openAutomatically,
    reloadDelay: config.browserSync.reloadDelay,
    injectChanges: config.browserSync.injectChanges,
    online: config.browserSync.online,
    ui: config.browserSync.ui
  });
});

/**
 * Watcher task.
 */
gulp.task('watch', function () {
  // watch scss for changes
  gulp.watch(['../_components/**/*.scss'], ['sass'])
      .on('change', browserSync.reload);

  // watch js for changes
  gulp.watch(['../{_js-src,_components}/**/*.js'], ['compress'])
      .on('change', browserSync.reload);

  // watch twig&json for changes
  gulp.watch(['../_components/**/*.twig', '../_components/**/*.json'])
      .on('change', browserSync.reload);

  // If user has specified an override
  if (!config.twig.useCache) {
    gulp.watch(['../templates/*.twig'])
        .on('change', browserSync.reload);
  }
});

gulp.task('prod', ['sass', 'compress']);
gulp.task('default', ['browser-sync', 'html', 'watch']);
