var gulp = require('gulp');
var gutil = require('gulp-util');
var coffee = require('gulp-coffee');
var slim = require('gulp-slim');
var sass = require('gulp-sass');
var connect = require('gulp-connect');
var del = require('del');

var paths = {
  coffee: ['./src/javascripts/*.coffee'],
  slim: ['./src/*.slim'],
  sass: ['./src/stylesheets/*.sass'],
};

gulp.task('clean', function() {
  return del(['public']);
});

gulp.task('coffee', ['clean'], function() {
  return gulp.src(paths.coffee)
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(gulp.dest('./public/javascripts/'));
});

gulp.task('slim', ['clean'], function() {
  return gulp.src(paths.slim)
    .pipe(slim({pretty: true}))
    .pipe(gulp.dest('./public/'));
});

gulp.task('sass', ['clean'], function() {
  return gulp.src(paths.sass)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/stylesheets/'));
});

gulp.task('watch', function() {
  gulp.watch(paths.coffee, ['coffee']);
  gulp.watch(paths.slim, ['slim']);
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('serve', function() {
  connect.server({
    root: 'public',
    livereload: true
  });
});

gulp.task('default', ['watch', 'coffee', 'slim', 'sass', 'serve']);
