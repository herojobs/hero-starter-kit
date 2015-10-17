var path = require('path');
var babel = require('babel-loader');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

const CSS_LOADER = 'css-loader';
var commonsPlugin =
  new webpack.optimize.CommonsChunkPlugin('common.js');
module.exports = {
  watch: true,
  context: __dirname,
  entry: {
    admin: './src/public/js/admin.js'
  },
  output: {
    path: path.join(__dirname, '/src/public/dist'),
    filename: '[name].js'
  },
  resolve: {
    root: [path.join(__dirname, 'bower_components')]
  },
  module: {
    loaders: [{
      test: /\.css$/,
      loader: ExtractTextPlugin.extract("style-loader", `${CSS_LOADER}?sourceMap`)
    }, {
      test: /\.less$/,
      loader: ExtractTextPlugin.extract("style-loader", `${CSS_LOADER}?sourceMap!less-loader?sourceMap`)
    }, {
      test: /\.sass$/,
      loader: ExtractTextPlugin.extract("style-loader", `${CSS_LOADER}?sourceMap!sass-loader?sourceMap`)
    }, {
      test: /\.txt/,
      loader: 'file?name=[path][name].[ext]'
    }, {
      test: /\.gif/,
      loader: 'url-loader?limit=10000&mimetype=image/gif'
    }, {
      test: /\.jpg/,
      loader: 'url-loader?limit=10000&mimetype=image/jpg'
    }, {
      test: /\.png/,
      loader: 'url-loader?limit=10000&mimetype=image/png'
    }, {
      test: /\.svg/,
      loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
    }, {
      test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url?limit=10000&mimetype=application/font-woff"
    }, {
      test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url?limit=10000&mimetype=application/font-woff2"
    }, {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url?limit=10000&mimetype=application/octet-stream"
    }, {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      loader: "file"
    }, {
      test: /\.woff(\?[a-z0-9]+)?$/,
      loader: "url?limit=10000&mimetype=application/font-woff"
    }, {
      test: /\.(woff(2)?)(\?[a-z0-9]+)?$/,
      loader: "url?limit=10000&mimetype=application/font-woff2"
    }, {
      test: /\.ttf(\?[a-z0-9]+)?$/,
      loader: "url?limit=10000&mimetype=application/octet-stream"
    }, {
      test: /\.eot(\?[a-z0-9]+)?$/,
      loader: "file"
    }, {
      test: /\.js?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel',
      query: {
        optional: ['runtime']
      }
    }]
  },
  plugins: [
    new ExtractTextPlugin('styles.css'),
    commonsPlugin,
    new webpack.ResolverPlugin(
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin(
        'bower.json', ['main'])
    ),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'windows.jQuery': 'jquery'
    })
  ]
}
