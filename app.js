module.exports = app => {
  app.config.coreMiddleware.unshift('report');

  app.once('server', server => {
  });
  app.on('error', (err, ctx) => {
    // report error
  });
  app.on('request', ctx => {
  });
  app.on('response', ctx => {
    // ctx.starttime is set by framework
		// const used = Date.now() - ctx.starttime;
    // log total cost
  });

  // 注意，只有在 egg-ready 事件拿到之后才能发送消息
  app.messenger.once('egg-ready', () => {
    app.messenger.sendToAgent('agent-event', { 'txt': 'app-agent' });
    app.messenger.sendToApp('app-event', { 'txt': 'app-app' });
  }); 
  
  app.messenger.on('app-event', (data) => {
		console.info(data)
  });  
};