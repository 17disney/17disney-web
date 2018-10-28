'use strict';
const path = require('path');

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1536634125466_6852';

  // add your config here
  config.middleware = [];

  config.static = {
    prefix: '/',
    dir: path.join(appInfo.baseDir, '../dist'),
  };

  return config;
};
