import path from 'path';
import _ from 'lodash';
let rootPath = path.normalize(__dirname + '/..');
let env = process.env.NODE_ENV || 'development';
let workers = process.env.WEB_CONCURRENCY || 1;
let config = {
  all: {
    root: rootPath,
    numberOfWorkers: workers
  }
}

export default _.extend(
  config.all,
  config[env] || {}
);
