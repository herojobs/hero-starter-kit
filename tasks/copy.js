var gulp = require('gulp');
require('./clean');
gulp.task('copy',['clean','copyPublic','copyViews'], function() {
});

gulp.task('copyPublic',['clean'], function(){
  return gulp.src('./src/public/**/*').pipe(gulp.dest('./dist/public'));
});

gulp.task('copyViews',['clean'], function(){
  return gulp.src('./src/app/views/**/*').pipe(gulp.dest('./dist/app/views'));
})
