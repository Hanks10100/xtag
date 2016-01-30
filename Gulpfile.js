var gulp = require('gulp');
var del = require('del');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');

var filePath = [
    'src/shared/*.js',
    'src/components/*.js',
    'src/compile.js',
    'src/connect.js',
];

gulp.task('clean', function() {
  return del('./dist');
});

gulp.task('script', function() {
  return gulp.src(filePath)
    .pipe(sourcemaps.init())
    .pipe(concat('xtag.js'))
    .pipe(gulp.dest('dist'))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['clean'], function() {
    gulp.start('script');
    gulp.watch('src/**/*.js', ['script']);
});
