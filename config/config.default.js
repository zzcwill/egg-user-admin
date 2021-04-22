'use strict';

const path = require('path');

module.exports = appInfo => {
  const config = {};

  config.config = 'http://127.0.0.1';
  config.log_dir = path.resolve(__dirname, '../logs');
	config.uploadOption= {
		//上传路径-'/imgData/uploads/'
		uploadsUrl: '/uploads/',
		maxSize: 1024 * 1024 * 10	
	},
  config.tokenSecurity = {
    secretKey: "zzc",
    // 过期时间 3小时
    expiresIn: 60 * 60 * 24
  };

  config.noauthArr = ['/api/login', '/api/createUser', '/api/upload', '/api/wechat/jscode2session', '/api/wechat/getUserInfo'];

  config.keys = appInfo.name + '_zzc';
  config.maxAge = 4 * 3600 * 1000;

  config.view = {
    defaultViewEngine: 'ejs',
    mapping: {
      '.ejs': 'ejs',
    },
  };

  config.news = {
    pageSize: 2,
    serverUrl: 'https://cnodejs.org/api/v1',
  };

  // add your middleware config here
  config.middleware = [
    'notfoundHandler',
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
      port: 3000,
    },
  };

  config.logger = {
    outputJSON: true,
  };

  config.session = {
    key: 'session',
    // maxAge: 24 * 3600 * 1000, // 1 天
    maxAge: 4 * 3600 * 1000,
    httpOnly: true,
    encrypt: true,
  };


  return config;
};
