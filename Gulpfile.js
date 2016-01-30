var gulp = require('gulp');
var del = require('del');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var webpack = require('webpack-stream');
var webpackConfig = require('./webpack.config.js');

// var filePath = [
//     'src/shared/*.js',
//     'src/components/*.js',
//     'src/compile.js',
//     'src/connect.js',
// ];
var filePath = 'src/index.js';

gulp.task('clean', function() {
  return del('./dist');
});

gulp.task('script:compile', function() {
  return gulp.src(filePath)
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('dist'));
});

gulp.task('script:min', ['script:compile'], function() {
  return gulp.src('dist/*.js')
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('script', ['clean'], function() {
    gulp.start('script:compile');
    gulp.start('script:min');
});

gulp.task('default', ['clean'], function() {
    gulp.start('script');
    gulp.watch('src/**/*.js', ['script']);
});
