'use strict';

var gulp        = require('gulp'),
    less        = require('gulp-less'),
    plumber     = require('gulp-plumber'),
    ngAnnotate  = require('gulp-ng-annotate'),
    ngmin       = require('gulp-ngmin'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify'),
    clean       = require('gulp-clean'),
    paths       = {
        common : 'public'
    };

gulp.task('default', ['clean'], function() {
    gulp.start('style');
    gulp.start('script-app');
    gulp.start('script-lib');
});

/*
    STYLE
*/
gulp.task('style', function () {
    gulp.src(paths.common+'/less/style.less')
        .pipe(plumber())
        .pipe(less())
        .pipe(gulp.dest(paths.common+'/css/'));
});

/*
    JS
*/
gulp.task('script-app', function() {
    gulp.src([
        paths.common+'/js/app/app.js'
        ,paths.prefix+'/js/app/controllers/*.js'
        ,paths.prefix+'/js/app/directives/*.js'
        ,paths.prefix+'/js/app/filters/*.js'
        ,paths.prefix+'/js/app/services/*.js'
    ].reverse())
        .pipe(plumber())
        .pipe(ngAnnotate())
        .pipe(ngmin())
        .pipe(concat('app.js'))
        .pipe(gulp.dest(paths.common+'/js'));
});

gulp.task('script-lib', function() {
    gulp.src([
        paths.common+'/js/libs/angular/angular.js'
    ].reverse())
        .pipe(plumber())
        .pipe(ngmin())
        .pipe(uglify({mangle: false}))
        .pipe(concat('libs.js'))
        .pipe(gulp.dest(paths.common+'/js'));
});

/*
    CLEAN
 */
gulp.task('clean', function() {
    gulp.src([
        paths.common+'/js/app.js',
        paths.common+'/js/libs.js',
        paths.common+'/css/style.css'
    ])
        .pipe(clean());
});

/*
    WATCH
 */
gulp.task('watch', function() {
    gulp.watch(paths.common+'/js/app/**/*.js', ['script-app']);
    gulp.watch(paths.common+'/less/**/*.less', ['style']);
});