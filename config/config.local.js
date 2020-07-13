'use strict';

module.exports = appInfo => {
  const config = {};

  config.cluster = {
    listen: {
      path: '',
      port: 7001,
      hostname: '0.0.0.0',
    },
  };

  return config;
};
