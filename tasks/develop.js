var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

gulp.task('develop',['watch'], function() {
	nodemon({
		script: './dist/server.js',
		ext: 'js coffee swig',
		nodeArgs: ['--debug=5878']
	}).on('restart', function() {

	});
});

gulp.task('watch',function(){
  gulp.watch('./src/**/*', ['build']);
});
