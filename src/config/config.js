import path from 'path';
import _ from 'lodash';
let rootPath = path.normalize(__dirname + '/..');
let env = process.env.NODE_ENV || 'development';
let workers = process.env.WEB_CONCURRENCY || 1;
let config = {
  all: {
    env: env,
    root: rootPath,
    numberOfWorkers: workers,
    port: process.env.PORT || 3050,
  },
  development:{
    db: 'mongodb://localhost:27017',
  }
}

export default _.extend(
  config.all,
  config[env] || {}
);
