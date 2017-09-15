var gulp = require('gulp');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var angularOrder = require('gulp-angular-order');

//var imagemin = require('gulp-imagemin');

var path = {
  script: 'app/*.js',
  image: 'public/image/*.jpg',
  css: 'public/css/*.css'
};

/**
 * 1. Lint our JavaScript. (Seriously. Do it.)
 * 2. Compile our Sass files. (Browsers can’t read that stuff...)
 * 3. Concatenate our JavaScript. (Reduce HTTP Requests!)
 * 4. Minify and rename concatenated files. (Every little bit counts!)
 */

 // Lint Task
gulp.task('lint', function() {
    return gulp.src('app/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Concatenate & Minify JS
gulp.task('script', function() {
    return gulp.src(['app/app.module.js', 'app/*.js'])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify({ mangle: false }))
        .pipe(gulp.dest('dist/js'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('app/*.js', ['lint', 'script']);
});

gulp.task('default',  ['lint', 'script', 'watch']);
