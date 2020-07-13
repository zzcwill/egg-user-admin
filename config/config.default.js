'use strict';

module.exports = appInfo => {
  const config = {};

  config.keys = appInfo.name + '_1585114634462_7124';
  config.maxAge = 4 * 3600 * 1000;

  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.tpl': 'nunjucks',
    },
  };

  config.news = {
    pageSize: 2,
    serverUrl: 'https://cnodejs.org/api/v1',
  };

  // add your middleware config here
  config.middleware = [
    'robot',
    'gzip',
  ];
  config.robot = {
    ua: [
      /Baiduspider/i,
    ],
  };
  config.gzip = {
    threshold: 1024, // 小于 1k 的响应体不压缩
  };

  config.security = {
    csrf: {
      // 判断是否需要 ignore 的方法，请求上下文 context 作为第一个参数
      ignore: ctx => {
        if (ctx.request.url.indexOf('/api') !== -1) {
          return true;
        }
        return false;

      },
    },
  };

  config.multipart = {
    mode: 'stream',
  };

  config.cluster = {
    listen: {
      path: '',
      port: 7002,
      hostname: '0.0.0.0',
    },
  };

  config.mysql = {
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
    agent: false,
  };

  config.logger = {
    outputJSON: true,
  };

  config.session = {
    key: 'token',
    // maxAge: 24 * 3600 * 1000, // 1 天
    maxAge: 4 * 3600 * 1000,
    httpOnly: true,
    encrypt: true,
  };

  config.redis = {
    client: {
      host: '47.110.47.104',
      port: '6379',
      password: 'chenyan20200107',
      db: '15',
    },
    agent: true,
  };


  return config;
};
