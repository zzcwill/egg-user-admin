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
}

module.exports = NewsController;