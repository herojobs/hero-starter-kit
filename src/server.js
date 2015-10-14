import cluster from 'cluster';
import test from './test';
import express from 'express';

var app = express();
var server = app.listen(1234,function () {
  var host = server.address().address;
  var port = server.address().port;



  console.log('Core app listening at http://%s:%s', host, port);
});
