var gulp = require('gulp');
require('./clean');
gulp.task('copy',['clean'], function() {
  return gulp.src('./src/public/**/*').pipe(gulp.dest('./dist/public'));
});
