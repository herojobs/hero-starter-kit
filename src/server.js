import cluster from 'cluster';
import test from './test';
import express from 'express';
import config from './config/config';
if (cluster.isMaster) {
  // Create a worker for each CPU
  for (var i = 0; i < config.numberOfWorkers; i += 1) {
    cluster.fork();
  }
} else {
  var app = express();
  require('./config/express')(app);
  var server = app.listen(1234, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Core app listening at http://%s:%s', host, port);
  });
}
cluster.on('exit', function(worker) {

  // Replace the dead worker,
  // we're not sentimental
  console.log('Worker %d died :(', worker.id);
  cluster.fork();

});
