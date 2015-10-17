var gulp = require('gulp');
var gutil = require("gulp-util");
var webpack = require("webpack");
var webpackConf = require('../webpack.config');
gulp.task("webpack",['build'], function() {
  // run webpack
  return webpack(webpackConf,
    function(err, stats) {
      if (err) throw new gutil.PluginError("webpack", err);
      gutil.log("[webpack]", stats.toString({
        // output options
      }));
    });
});
