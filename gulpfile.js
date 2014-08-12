'use strict';

var gulp = require('gulp');
var webserver = require('gulp-webserver');

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
            livereload: true,
            directoryListing: false,
            open: true
        }));

    cons();
});