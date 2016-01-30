var gulp = require('gulp');
var concat = require('gulp-concat');

var filePath = [
    'src/shared/*.js',
    'src/components/*.js',
    'src/compile.js',
    'src/connect.js',
];

gulp.task('script', function() {
  return gulp.src(filePath)
    .pipe(concat('xtag.js'))
    .pipe(gulp.dest('dist'));
});
