"use strict";

const Controller = require("egg").Controller;
const md5 = require("md5");
const dayjs = require("dayjs");
const BaseController = require("./base");

class UserController extends BaseController {
  async jwtSign({ id, username }) {
    const { ctx, app } = this;

    const token = app.jwt.sign(
      {
        id,
        username,
      },
      app.config.jwt.secret
    );
    // ctx.session[username] = 1;
    // 设置redis缓存
    await app.redis.set(username, token, "EX", app.config.redisExpire);
    return token;
  }

  parseResult(ctx, result) {
    return {
      ...ctx.helper.unPick(result.dataValues, ["password"]),
      createTime: ctx.helper.timestamp(result.createTime),
    };
  }

  async register() {
    const { ctx, app } = this;
    const params = ctx.params();
    const user = await ctx.service.user.getUser(params.username);
    if (user) {
      this.error("用户已存在");
      // ctx.body = {
      //   status: 500,
      //   errMsg: '用户已存在'
      // };
      return;
    }

    const result = await ctx.service.user.add({
      ...params,
      //加密 防止反解密
      password: md5(params.password + app.config.salt),
      createTime: ctx.helper.time(),
    });
    if (result) {
      const token = await this.jwtSign({
        id: result.id,
        username: result.username,
      });
      this.success({
        ...this.parseResult(ctx, result),
        //...ctx.helper.unPick(result.dataValues, ['password']),
        //createTime: ctx.helper.timestamp(result.createTime),
        token,
      });
      // ctx.body = {
      //   status: 200,
      //   data: {
      //     ...this.parseResult(ctx, result),
      //     //...ctx.helper.unPick(result.dataValues, ['password']),
      //     //createTime: ctx.helper.timestamp(result.createTime),
      //     token,
      //   }
      // };
    } else {
      this.error("注册用户失败");
      // ctx.body = {
      //   status: 500,
      //   errMsg: '注册用户失败'
      // };
    }
  }

  async login() {
    const { ctx, app } = this;
    const { username, password } = ctx.params();
    const user = await ctx.service.user.getUser(username, password);

    if (user) {
      const token = await this.jwtSign({
        id: user.id,
        username: user.username,
      });
      this.success({
        ...this.parseResult(ctx, user),
        //...ctx.helper.unPick(user.dataValues, ['password']),
        //createTime: ctx.helper.timestamp(user.createTime),
        token,
      });
      // ctx.body = {
      //   status: 200,
      //   data: {
      //     ...this.parseResult(ctx, user),
      //     //...ctx.helper.unPick(user.dataValues, ['password']),
      //     //createTime: ctx.helper.timestamp(user.createTime),
      //     token
      //   }
      // };
    } else {
      this.error("该用户不存在");
      // ctx.body = {
      //   status: 500,
      //   errMsg: '该用户不存在'
      // };
    }
  }

  async detail() {
    const { ctx, app } = this;
    const user = await ctx.service.user.getUser(ctx.username);
    if (user) {
      this.success({
        ...this.parseResult(ctx, user),
        //...ctx.helper.unPick(user.dataValues, ['password']),
        //createTime: ctx.helper.timestamp(user.createTime),
      });
      // ctx.body = {
      //   status: 200,
      //   data: {
      //     ...this.parseResult(ctx, user),
      //     //...ctx.helper.unPick(user.dataValues, ['password']),
      //     //createTime: ctx.helper.timestamp(user.createTime),
      //   }
      // };
    } else {
      this.error("该用户不存在");
      // ctx.body = {
      //   status: 500,
      //   errMsg: '该用户不存在'
      // };
    }
  }

  async logout() {
    const { ctx, app } = this;
    try {
      await app.redis.del(ctx.username);
      this.success("ok");
      // ctx.body = {
      //   status: 200,
      //   data: 'ok'
      // };
    } catch (error) {
      this.error("退出登录失败");
      // ctx.body = {
      //   status: 500,
      //   errMsg: '退出登录失败'
      // }
    }
  }

  async edit() {
    const { ctx, app } = this;
    const result = ctx.service.user.edit({
      ...ctx.params(),
      updateTime: ctx.helper.time(),
      //xss防御 过滤输入
      sign: ctx.helper.escape(ctx.params('sign'))
    });

    this.success(result);
  }
}

module.exports = UserController;
