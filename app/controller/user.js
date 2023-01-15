'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  encode(str = ''){
    return new Buffer(str).toString("base64");
  }
  decode(str = ''){
    return new Buffer(str, "base64").toString();
  }

  async index() {
    const { ctx } = this;

    //获取session
    const session = ctx.session.user;
    const zhSession = ctx.session.zh;
    console.log(zhSession)

    //设置中文cookie
    ctx.cookies.set("zh", "测试", {
      encrypt: true
    });

    const zh = ctx.cookies.get("zh", {
      encrypt: true
    });
    console.log(zh)

    ctx.cookies.set("base64", this.encode("中文base64"));
    const base64 = this.decode(ctx.cookies.get("base64"));
    //ctx.body = 'user index';
    const user = ctx.cookies.get("user");
    await ctx.render('user.html', {
      id: 100,
      name: 'admin',
      lists: [
        'JAVA',
        'PHP',
        'TS'
      ],
      user: user ? JSON.parse(user) : null,
      zh,
      base64
    });
  }

  async login(){
    const { ctx } = this;
    const body = ctx.request.body;
    ctx.cookies.set("user", JSON.stringify(body), {
      maxAge: 1000 * 60 * 10,
      httpOnly: false
    });

    //保存session
    ctx.session.user = body;
    ctx.session.zh = '中文测试';
    ctx.session.test = 'test';

    ctx.body = {
      status: 200,
      data: body
    };
  }

  async logout(){
    const { ctx } = this;
    ctx.cookies.set("user", null);
    ctx.session.user = null;
    ctx.body = {
      status: 200,
    };
  }

  async lists() {
    const { ctx } = this;
    await new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 1500);
    });

    ctx.body = [{ id: 123 }];
  }

  async detail() {
    const { ctx } = this;
    // console.log(ctx.query);
    const res = ctx.service.user.detail(10);
    console.log(res);
    ctx.body = ctx.query.id;
  }

  async detail2() {
    const { ctx } = this;
    console.log(ctx.params);
    ctx.body = ctx.params.id;
  }

  async add() {
    const { ctx } = this;
    console.log(ctx.request.body);

    const rule = {
      name: { type: 'string' },
      age: { type: 'number' },
    };

    ctx.validate(rule);

    ctx.body = {
      status: 200,
      data: ctx.request.body,
    };
  }

  async edit() {
    const { ctx } = this;
    ctx.body = ctx.request.body;
  }

  async del() {
    const { ctx } = this;
    ctx.body = ctx.request.body.id;
  }
}

module.exports = UserController;
