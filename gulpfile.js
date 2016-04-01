var gulp = require('gulp'),
    less = require('gulp-less'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css');

gulp.task('less', function(){

    gulp.src('./src/groupon/less/*.less')
        .pipe(less())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .on('error', function(e){console.log(e);} )
        .pipe(gulp.dest('./src/groupon/css/'));

});

//minify
gulp.task('min-styles',['build-less'], function() {
    gulp.src(['./public/css/*.css'])
        .pipe(concat('all.css'))
        .pipe(gulp.dest('./public/css/'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(gulp.dest('./public/css/'));
});

gulp.task('develop', ['less'], function() {
    gulp.watch('./src/groupon/less/*.less', ['less']);
});