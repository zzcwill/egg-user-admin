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
    'robot',
    'gzip'
  ];
  exports.robot = {
    ua: [
      /Baiduspider/i
    ]
  }; 
  exports.gzip = {
    threshold: 1024 // 小于 1k 的响应体不压缩
  };
  
  exports.security = {
    csrf: {
      // 判断是否需要 ignore 的方法，请求上下文 context 作为第一个参数
      ignore: ctx => {
        if (ctx.request.url.indexOf('/api')!=-1) {
          return true;
        }else{
          return false;
        }
      }
    }
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
