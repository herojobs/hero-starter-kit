var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

gulp.task('develop', ['clean', 'copy', 'build'], function() {
  nodemon({
    script: './dist/server.js',
    ext: 'js coffee swig',
    nodeArgs: ['--debug=5878'],
    watch: ['./dist']
  }).on('restart', function() {

  });

});

gulp.task('watch', function() {
  gulp.watch('./src/**/*', ['build']);
});
