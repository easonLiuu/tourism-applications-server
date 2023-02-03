const Controller = require("egg").Controller;
const BaseController = require("./base");

class OrdersController extends BaseController {
  async hasOrder() {
    const { ctx, app } = this;
    const user = await ctx.service.user.getUser(ctx.username);
    const result = await ctx.service.orders.hasOrder({
      userId: user.id,
      houseId: ctx.params("id"),
    });
    this.success(result);
  }

  async addOrder() {
    const { ctx, app } = this;
    const user = await ctx.service.user.getUser(ctx.username);
    const result = await ctx.service.orders.addOrder({
      userId: user.id,
      houseId: ctx.params("id"),
      isPayed: 0,
      createTime: ctx.helper.time(),
    });
    this.success(result);
  }

  async delOrder() {
    const { ctx, app } = this;
    const result = await ctx.service.orders.delOrder(ctx.params("id"));
    this.success(result);
  }

  async lists() {
    const { ctx, app } = this;
    const user = await ctx.service.user.getUser(ctx.username);
    const result = await ctx.service.orders.lists({
      ...ctx.params(),
      userId: user.id,
    });
    this.success(result);
  }

  async invokePay(params) {
    return {
      orderNumber: params.id + new Date().getTime(),
    };
  }

  async pay() {
    const { ctx, app } = this;
    const { id } = ctx.params();
    const order = await ctx.model.Orders.findByPk(id);
    if (order) {
      try {
        const beforePay = await this.invokePay({ id });
        const result = await ctx.service.orders.pay({
          id,
          orderNumber: beforePay.orderNumber,
        });
        this.success(result);
      } catch (error) {
        this.error("订单支付失败!");
      }
    } else {
      this.error("订单不存在");
    }
  }
}

module.exports = OrdersController;
