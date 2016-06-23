var gulp = require('gulp'),
    gutil = require('gulp-util'),
    argv = require('yargs').argv,
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    stylus = require('gulp-stylus'),
    imagemin = require('gulp-imagemin'),
    newer = require('gulp-newer'),
    pngquant = require('imagemin-pngquant'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create();

// HTML files
var htmlSrc = ['**/*.html','!node_modules/**','!_builds/**'];
var htmlDest = '_builds';
// Images
var imgSrc = ['**/img/*','!node_modules/**','!_builds/**'];
var imgDest = '_builds';
// Stylesheets
var cssSrc = ['**/*.styl','!node_modules/**','!_builds/**'];
var cssDest = '_builds';
// Sripts
var jsSrc = ['**/*.js','!node_modules/**','!_builds/**','!gulpfile.js'];
var jsDest = '_builds';
// Fonts
var fontSrc = ['**/fonts/*.{ttf,woff,eof,svg}','!node_modules/**','!_builds/**'];
var fontDest = './_builds';

gulp.task('html', function() {
  return gulp.src(htmlSrc)
  .pipe(newer(htmlDest))
  .on('error', gutil.log)
  .pipe(gulp.dest(htmlDest))
  .pipe(browserSync.stream());
});

gulp.task('js', function(){
  return gulp.src(jsSrc)
  .pipe(gulpif(argv.production, uglify()))
  .on('error', gutil.log)
  .pipe(gulp.dest(jsDest))
  .pipe(browserSync.stream());
  // .pipe(browserSync.stream({once: true}));
});

gulp.task('stylus', function(){
  return gulp.src(cssSrc)
  .pipe(gulpif(argv.production, stylus({compress: true}), stylus()))
  .on('error', gutil.log)
  .pipe(autoprefixer({
    browsers: ['last 8 versions', 'ie 9']
  }))
  .pipe(gulp.dest(cssDest))
  .pipe(browserSync.stream());
});

gulp.task('images', function() {
  return gulp.src(imgSrc)
  .on('error', gutil.log)
  .pipe(newer(imgDest))
  .pipe(gulpif(argv.production, imagemin()))
  // .pipe(gulpif(argv.production, imagemin({optimizationLevel: 5, progressive: true, interlaced: true, svgoPlugins: [{removeViewBox: true}], use: [pngquant()]})))
  // use: [pngquant(), gifsicle(), svgo(), jpegtran()]
  .pipe(gulp.dest(imgDest))
  .pipe(browserSync.stream());
});

gulp.task('fonts', function() {
  return gulp.src(fontSrc)
  .on('error', gutil.log)
  .pipe(gulp.dest(fontDest));
});

gulp.task('watch', function () {
  gulp.watch(jsSrc, ['js']);
  gulp.watch(htmlSrc, ['html']);
  gulp.watch(cssSrc, ['stylus']);
  gulp.watch(imgSrc, ['images']);
});

// All tasks in serve tasks for quicker process on Windows
gulp.task('serve', ['js','stylus','html','images','fonts','watch'], function () {
  browserSync.init({
    server: {
      baseDir: "./_builds"
    }
  });
});

gulp.task('default', ['serve']);
