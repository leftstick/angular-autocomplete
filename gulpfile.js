'use strict';

var gulp = require('gulp');
var webserver = require('gulp-webserver');

gulp.task('demo', function(cons) {

    gulp.src('./demo/')
        .pipe(webserver({
            livereload: true,
            directoryListing: false,
            open: true
        }));

    cons();
});