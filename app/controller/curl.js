const Controller = require('egg').Controller;

class CurlController extends Controller {
  async curlGet() {
    const { ctx, app } = this;
    const res = await ctx.curl("http://localhost:7002/", {
        dataType: "json"
    });
    console.log(res);
    ctx.body = {
        status: 200,
        data: res.data
    }
  }

  async curlPost(){
    const { ctx, app } = this;
    const res = await ctx.curl("http://localhost:7002/login", {
        method: "post",
        contentType: "json",
        data: ctx.request.body,
        dataType: "json"
    });
    console.log(res)
    ctx.body = res.data
  }
}

module.exports = CurlController;