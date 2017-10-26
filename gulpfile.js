var gulp          = require('gulp'),
    concat        = require('gulp-concat'),
    concatcss     = require('gulp-concat-css'),
    sass          = require('gulp-sass'),
    csso          = require('gulp-csso'),
    autoprefixer  = require("gulp-autoprefixer"),
    uglify        = require('gulp-uglify');

/**
 * -----------------------------------------------------------------------------
 * SASS compilation & CSS optimization
 * -----------------------------------------------------------------------------
 */

gulp.task('css', function () {
  // Base styles
  gulp.src([
    './src/stylesheets/base/*.scss',
    './src/stylesheets/base/**/*.scss'
  ])
    .pipe(
      sass({
        includePaths: [ "./src/stylesheets" ]
      })
    )
    .pipe(
      concat('base.css')
    )
    .pipe(
      autoprefixer()
    )
    .pipe(
      csso()
    )
    .pipe(
      gulp.dest('./dist/css')
    );

  // Themes
  gulp.src([
    './src/stylesheets/themes/*.scss',
    './src/stylesheets/themes/**/*.scss'
  ])
    .pipe(
      sass({
        paths: [ "./src/stylesheets" ]
      })
    )
    .pipe(
      autoprefixer()
    )
    .pipe(
      csso()
    )
    .pipe(
      gulp.dest('./dist/css')
    );
});


/**
 * -----------------------------------------------------------------------------
 * JS compilation
 * -----------------------------------------------------------------------------
 */

gulp.task('js', function () {
  gulp.src([
    './resources/js/.main.js',
    './resources/js/.routes.js',
    './resources/js/**/*.js'
  ])
    .pipe(
      concat('inspiremail.js'/*, { newLine: ";" }*/)
    )
    .pipe(
      gulp.dest('./dist/js')
    );
});


/**
 * -----------------------------------------------------------------------------
 * Tasks
 * -----------------------------------------------------------------------------
 */

gulp.task('watch', function () {

  gulp.watch(['./src/stylesheets/*.scss', './src/stylesheets/**/*.scss'], ['css']);
  gulp.watch(['./src/js/*.js', './resources/js/**/*.js'], ['js']);

});

gulp.task('default', ['css', 'js', 'watch']);
