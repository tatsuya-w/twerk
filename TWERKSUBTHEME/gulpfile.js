/**
 * @file
 * Gulpfile for fortytwo.
 */

var autoprefixer = require('autoprefixer');
var cssMqpacker = require('css-mqpacker');
var del = require('del');
var eslint = require('eslint');
var gulp = require('gulp');
var postcss = require('gulp-postcss');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss');
var stylelint = require('stylelint');

/**
 * @task js
 * ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code
 * UglifyJS is a JavaScript parser, minifier, compressor and beautifier toolkit.
 */
 gulp.task('js', function() {
   return gulp.src('js/**/*.js')
     .pipe(eslint())
     .pipe(eslint.format())
     .pipe(eslint.failOnError());
     .pipe(sourcemaps.init())
       .pipe(uglify())
     .pipe(sourcemaps.write())
     .pipe(gulp.dest('dist/js'));
 });


/**
 * @task js
 * Sass lint + Sass compilation to CSS + add vendor prefixes + minify (refactor media queries + uglify)
 */
gulp.task('css', ['sass-lint'], function () {
  return gulp.src('sass/**/*.s+(a|c)ss')
    .pipe(stylelint())
    .pipe(sass())
    .on('error', function (err) {
      console.log(err);
      this.emit('end');
    })
    .pipe(sourcemaps.init())
    .pipe(postcss(
      autoprefixer({browsers: ['> 5%', 'last 2 versions', 'safari 8', 'IE 10', 'IE 11']}),
      cssMqpacker(),
      uglifycss()
    ))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/css'));
});


/**
 * @task clean
 * Clean the dist folder.
 */
gulp.task('clean', function () {
  return del(['dist/css/*', 'dist/js/*']);
});

/**
 * @task watch
 * Watch files and do stuff.
 */
gulp.task('watch', ['clean', 'css', 'js'], function () {
  gulp.watch('sass/**/*.+(scss|sass)', ['css']);
  gulp.watch('js/**/*.js', ['js']);
});

/**
 * @task default
 * Watch files and do stuff.
 */
gulp.task('default', ['watch']);
