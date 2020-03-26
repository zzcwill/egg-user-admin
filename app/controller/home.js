'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = ctx.session;
  }
  async user() {
    const { ctx } = this;

    if(!ctx.query.name){
      ctx.body = '缺少参数user'
    }

    if(ctx.query.name){
      ctx.body = 'hi, ' + ctx.query.name;
    }
  }
}

module.exports = HomeController;
