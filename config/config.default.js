/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1585114634462_7124';

  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.tpl': 'nunjucks',
    }
  }

  exports.news = {
    pageSize: 2,
    serverUrl: 'https://cnodejs.org/api/v1'
  };  



  // add your middleware config here
  exports.middleware = [
    'robot'
  ];
  // robot's configurations
  exports.robot = {
    ua: [
      /Baiduspider/i,
    ]
  };  

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
