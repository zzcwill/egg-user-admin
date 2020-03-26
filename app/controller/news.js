const Controller = require('egg').Controller;

class NewsController extends Controller {
  async list() {
    const ctx = this.ctx;
    const page = ctx.query.page || 1;
    const data = await ctx.service.news.list(page); 
    const newsList = {
      // list: [
      //   { id: 1, title: 'this is news 1'},
      //   { id: 2, title: 'this is news 2'}
      // ]
      list: data
    };      
    await this.ctx.render('news/list.tpl', newsList);
  }
  async add() {
    const { ctx, service } = this;

    if(ctx.request.body.content === '1') {
      ctx.logger.warn('news/add请求错误');
      ctx.body = { success: false };
      return;   
    }

    // 组装参数
    const time = (new Date()).getTime();
    const req = Object.assign(ctx.request.body, { time });
    // 调用 Service 进行业务处理
    const res = await service.news.add(req);
    // 设置响应内容和响应状态码
    ctx.body = res;
  }  
}

module.exports = NewsController;