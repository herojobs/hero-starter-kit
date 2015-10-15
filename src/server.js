import cluster from 'cluster';
import test from './test';
import express from 'express';
import mongoose from 'mongoose';
import glob from 'glob';
import config from './config/config';
var app = null;
function startApp(){
  var app = express();
  mongoose.connect(config.db);
  var db = mongoose.connection;
  db.on('error', function() {
    throw new Error('unable to connect to database at ' + config.db);
  });
  var models = glob.sync(config.root + '/app/*/*/models/*.js');

  models.forEach(function(model) {
    require(model);
  });

  require('./config/express')(app);
  var server = app.listen(config.port, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Core app listening at http://%s:%s', host, port);
  });
  return server;
}

if(config.env !== 'development'){
  if (cluster.isMaster) {
    // Create a worker for each CPU
    for (var i = 0; i < config.numberOfWorkers; i += 1) {
      cluster.fork();
    }
  } else {
    app = startApp();
  }
  cluster.on('exit', function(worker) {

    // Replace the dead worker,
    // we're not sentimental
    console.log('Worker %d died :(', worker.id);
    cluster.fork();

  });
} else{
  app = startApp();
}

export default app;
