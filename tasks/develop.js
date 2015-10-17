var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync');

gulp.task('develop', ['clean', 'copy', 'build', 'browser-sync'], function() {
  nodemon({
    script: './dist/server.js',
    ext: 'js coffee swig',
    nodeArgs: ['--debug=5878'],
    watch: ['./dist'],
    delay: 2000
  }).on('restart', function() {

  });

});
gulp.task('browser-sync', function() {
  browserSync.init({
    reloadDelay: 2000,
    reloadDebounce: 2000,
    proxy: 'http://localhost:3050',
    port: 3051
  });
});
gulp.task('dist-watch', browserSync.reload);

gulp.task('watch', function() {
  gulp.watch('./src/**/*', {
    debounceDelay: 2000
  }, ['build']);
  gulp.watch('./dist/**/*', {
    debounceDelay: 2000
  }, ['dist-watch']);
});
