'use strict';

var gulp = require('gulp');
var webserver = require('gulp-webserver');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');

var copyhAuto = function() {
    gulp.src('./hAuto.js').pipe(gulp.dest('./demo/libs/'));
};

gulp.task('demo', function(cons) {


    copyhAuto();
    gulp.watch('./hAuto.js', function() {
        copyhAuto();
    });

    gulp.src('./demo/')
        .pipe(webserver({
            port: 8080,
            livereload: true,
            directoryListing: false,
            open: true
        }));

    cons();
});

gulp.task('default', function() {
    return gulp.src('./hAuto.js')
        .pipe(sourcemaps.init())
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(uglify())
        .pipe(sourcemaps.write('./', {
            sourceRoot: '.'
        }))
        .pipe(gulp.dest('./'));
});
