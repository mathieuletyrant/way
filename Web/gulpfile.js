'use strict';

var gulp        = require('gulp'),
    plumber     = require('gulp-plumber'),
    ngAnnotate  = require('gulp-ng-annotate'),
    ngmin       = require('gulp-ngmin'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify'),
    clean       = require('gulp-clean'),
    minifyCSS = require('gulp-minify-css'),
    autoprefixer = require('gulp-autoprefixer'),
    paths       = {
        common : 'public'
    };

gulp.task('default', ['clean'], function() {
    gulp.start('script-app');
    gulp.start('script-lib');
    gulp.start('style');
});

/*
    STYLE
*/
gulp.task('style', function () {
    gulp.src([
        paths.common+'/css/src/reset.css'
        ,paths.common+'/css/src/fonts.css'
        ,paths.common+'/css/src/animation.css'
        ,paths.common+'/css/src/style.css'
        ,paths.common+'/css/src/responsive.css'
    ])
        .pipe(plumber())
        .pipe(concat('style.css'))
        .pipe(autoprefixer())
        .pipe(gulp.dest(paths.common+'/css'))
        .pipe(minifyCSS())
        .pipe(autoprefixer())
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest(paths.common+'/css'));
});

/*
    JS
*/
gulp.task('script-app', function() {
    gulp.src([
        paths.common+'/js/app/app.js'
        ,paths.common+'/js/app/controllers/*.js'
        ,paths.common+'/js/app/directives/*.js'
        ,paths.common+'/js/app/filters/*.js'
        ,paths.common+'/js/app/services/*.js'
    ])
        .pipe(plumber())
        .pipe(ngAnnotate())
        .pipe(ngmin())
        .pipe(concat('app.js'))
        .pipe(gulp.dest(paths.common+'/js'));
});

gulp.task('script-lib', function() {
    gulp.src([
        paths.common+'/js/libs/angular/angular.js',
        paths.common+'/js/libs/angular-animate/angular-animate.js',
        paths.common+'/js/libs/angular-ui-router/release/angular-ui-router.js',
        paths.common+'/js/libs/angular-facebook/lib/angular-facebook.js',
        paths.common+'/js/libs/ngstorage/ngStorage.js'
    ])
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
        paths.common+'/css/style.min.css',
        paths.common+'/css/style.css',
        paths.common+'/js/libs.js'
    ])
        .pipe(clean());
});

/*
    WATCH
 */
gulp.task('watch', function() {
    gulp.watch(paths.common+'/js/app/**/*.js', ['script-app']);
});