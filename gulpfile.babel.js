var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
require('./tasks/build');
require('./tasks/develop');
gulp.task('default',['build','develop','watch'], function(){
});
