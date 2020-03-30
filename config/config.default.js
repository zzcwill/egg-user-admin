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
  config.maxAge = 86400000;

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
        if (ctx.request.url.indexOf('/api') != -1) {
          return true;
        } else {
          return false;
        }
      }
    }
  };

  exports.multipart = {
    mode: 'stream'
  };

  exports.cluster = {
    listen: {
      path: '',
      port: 7002,
      hostname: '0.0.0.0'
    }
  }

  exports.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: '47.110.42.110',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: 'root',
      // 数据库名
      database: 'egg_user_admin',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false
  }; 

  exports.logger = {
    outputJSON: true,
  };

  exports.session = {
    key: 'EGG_SESS',
    maxAge: 24 * 3600 * 1000, // 1 天
    httpOnly: true,
    encrypt: true,
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
