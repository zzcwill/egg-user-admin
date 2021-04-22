'use strict';

module.exports = appInfo => {
  const config = {};

  config.cluster = {
    listen: {
      port: 3000,
    },
  };

  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: '127.0.0.1',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: 'root',
      // 数据库名
      database: 'shop',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };
  

  config.redis = {
    client: {
      host: '127.0.0.1',
      port: '6379',
      password: 'root',
      db: '1',
    },
    agent: true,
  }; 
  
  config.eamil = {
		service:'qq',
		auth: {
			user: '841811316@qq.com',
			pass: 'htunwtlqzxzdbccj'
		}	
	}
	config.mq = {
		port: 3300,
		rabbitMqOption: {
			protocol: 'amqp',
			hostname: '127.0.0.1',
			port:'5672',
			username:'root',
			password:'root',
			authMechanism: 'AMQPLAIN' ,
			pathname:'/',
			ssl: { 
					enabled : false  
			}  
		}		
	}

  return config;
};
