var gulp          = require('gulp'),
    color         = require('gulp-color'),
    concat        = require('gulp-concat'),
    concatcss     = require('gulp-concat-css'),
    sass          = require('gulp-sass'),
    csso          = require('gulp-csso'),
    autoprefixer  = require('gulp-autoprefixer'),
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
        includePaths: ['./src/stylesheets'],
        outputStyle: 'nested',
        errLogToConsole: true
      })
        .on('error', sass.logError)
        .on('error', function () {
            console.log(color('+-------------------------------+', 'RED'));
            console.log(color('| SASS Compilation Error (base) |', 'RED'));
            console.log(color('+-------------------------------+', 'RED'));
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
        paths: [ './src/stylesheets' ]
      })
        .on('error', sass.logError)
        .on('error', function () {
            console.log(color('+---------------------------------+', 'RED'));
            console.log(color('| SASS Compilation Error (themes) |', 'RED'));
            console.log(color('+---------------------------------+', 'RED'));
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
    './src/js/*.js',
    './src/js/**/*.js'
  ])
    .pipe(
      concat('inspiremail.js', {
        newLine: ';'
      })
    )
    .pipe(
      uglify({
        warnings: 'verbose',
        compress: {
            keep_fnames: true
        },
        mangle: {
            debug: true,
            keep_fnames: true
        },
        output: {
            beautify: true
        }
      })
        .on('error', function () {
            console.log(color('+----------------------+', 'RED'));
            console.log(color('| JS Compilation Error |', 'RED'));
            console.log(color('+----------------------+', 'RED'));
        })
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
  gulp.watch(['./src/js/*.js', './src/js/**/*.js'], ['js']);

});

gulp.task('default', ['css', 'js', 'watch']);
