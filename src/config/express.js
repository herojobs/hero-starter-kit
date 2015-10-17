import swig from 'swig';
import bunyanRequest from 'bunyan-request';
import bodyParser from 'body-parser';
import compress from 'compression';
import express from 'express';
import glob from 'glob';
import config from './config';
import logging from './logging';
import throwjs from 'throw.js';
export default (app) => {
  console.log(config.root);
  //View Engine (swig)
  app.engine('html', swig.renderFile);
  app.set('views', config.root + '/app/views');
  app.set('view engine', 'html');
  app.set('view cache', false);
  swig.setDefaults({ cache: false });
  //Set Body Parsers
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json({
    extended: true
  }));

  //Logging
  var requestLogger = bunyanRequest({
    logger: logging,
    headerName: 'x-request-id'
  });
  app.use(requestLogger);

  //Compression
  app.use(compress());

  //Set Static Directory
  app.use(express.static(config.root + '/public'));
  var routers = glob.sync(config.root + '/app/*/*/routes/*.js');
  routers.forEach(function(router) {
    require(router)(app);
  });

  app.get('/', function(req, res) {
    res.send('Hello World!');
  });
  app.get('/error', function(req, res, next) {
    next(new throwjs.internalServerError());
  });
  app.use(function(req, res, next) {
    console.log('404');
    next(new throwjs.notFound());
  });
  app.use(function(err, req, res, next) {
    console.log(err);
    logging.error(err);
    if (req.app.get('env') !== 'development' &&
      req.app.get('env') !== 'test') {
      delete err.stack;
    }
    res.status(err.statusCode || 500).json(err);
  });



}
