var gulp = require('gulp');

var babel = require('gulp-babel');
// var runSeq = require('run-sequence');
var plumber = require('gulp-plumber');
var concat = require('gulp-concat');
// var rename = require('gulp-rename');
// var livereload = require('gulp-livereload');
// var ngAnnotate = require('gulp-ng-annotate');
var sourcemaps = require('gulp-sourcemaps');
var eslint = require('gulp-eslint');
// var mocha = require('gulp-mocha');
// var karma = require('karma').server;
// var istanbul = require('gulp-istanbul');


gulp.task('lintJS', function () {
	return gulp.src(['./browser/**/*.js', './server/**/*.js'])
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failOnError());
});

gulp.task('buildJS', ['lintJS'], function () {
    return gulp.src(['./browser/app.js', './browser/**/*.js'])
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        .pipe(babel())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public'));
});

gulp.task('default', function () {
	console.log('gulping');
	gulp.start('buildJS');
	gulp.watch('./browser/*/', ['buildJS']);
});