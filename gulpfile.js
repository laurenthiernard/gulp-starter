var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    stylus = require('gulp-stylus'),
    imagemin = require('gulp-imagemin'),
    newer = require('gulp-newer'),
    pngquant = require('imagemin-pngquant'),
    autoprefixer = require('gulp-autoprefixer');
    browserSync = require('browser-sync').create();

// HTML files
var htmlSrc = ['**/*.html','!node_modules/**','!build/**'];
var htmlDest = 'build';
// Images
var imgSrc = 'img/*';
var imgDest = 'build/img';
// Stylesheets
var cssSrc = 'stylus/**/*.styl';
var cssDest = 'build/css';
// Sripts
var jsSrc = 'js/**/*.js';
var jsDest = 'build/js';

function errorLog(error) {
  console.error(error.toString());
  this.emit('end');
;}

gulp.task('html', function() {
  return gulp.src(htmlSrc)
  //.pipe(newer(htmlDest))
  .on('error', errorLog)
  .pipe(gulp.dest(htmlDest))
  .pipe(browserSync.stream({once: true}));
});

gulp.task('styles', function(){
  return gulp.src(cssSrc)
  .pipe(stylus())
  .on('error', errorLog)
  .pipe(autoprefixer({
      browsers: ['last 8 versions', 'ie 9']
    }))
  .pipe(gulp.dest(cssDest))
  .pipe(browserSync.stream({once: true}));
  // .pipe(browserSync.reload({
  //   stream: true
  // }))
});

gulp.task('scripts', function(){
  return gulp.src(jsSrc)
  .pipe(uglify())
  .on('error', errorLog)
  .pipe(gulp.dest(jsDest))
  .pipe(browserSync.stream({once: true}));
});

gulp.task('images', function() {
  return gulp.src(imgSrc)
    .pipe(newer(imgDest))
    .pipe(imagemin({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true,
        svgoPlugins: [{removeViewBox: true}],
			  use: [pngquant()]
        //use: [pngquant(), gifsicle(), svgo(), jpegtran()]
    }))
    .pipe(gulp.dest(imgDest))
    .pipe(browserSync.stream({once: true}));
});

gulp.task('serve', function() {
  browserSync.init({
      server: {
          baseDir: "./build"
      }
  });
});

gulp.task('watch', function (){
  gulp.watch(jsSrc, ['scripts']);
  gulp.watch(cssSrc, ['styles']);
  gulp.watch(htmlSrc, ['html']);
  gulp.watch(imgSrc, ['images']);
});


gulp.task('default', ['html','images','styles','scripts','serve','watch']);
// gulp.task('default', ['serve','watch']);