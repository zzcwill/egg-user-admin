'use strict';
const Controller = require('../core/base_controller');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    // ctx.body = ctx.session;
    ctx.body = ctx.app.cache;
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

  async login() {
    const { ctx } = this;
    await ctx.render('login/login.html');
  } 
  async apilogin() {
    const { ctx } = this;
    const { name } = ctx.request.body
    ctx.cookies.set('token', name, {
      httpOnly: true, // 默认就是 true
      encrypt: true, // 加密传输
    });
    ctx.session.token = name;
    this.success(name)
  } 
  async apiuserinfo() {
    const { ctx } = this;
    const { name } = ctx.request.body

    let sessionid = ctx.session.token;    
    let token = ctx.cookies.get('token',{
      httpOnly: false, // 默认就是 true
      encrypt: false, // 加密传输
    }); 

    if(!sessionid) {
      ctx.logger.warn('api/userinfo请求错误');
      this.fail(20000,'未登录')
      return;        
    }

    console.info(sessionid)
    console.info(token)

    this.success(token)
  }
}

module.exports = HomeController;
