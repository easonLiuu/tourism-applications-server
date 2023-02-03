'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  //中间件应用在这里是因为局部使用 不要全局使用
  const userExist = app.middleware.userExist();
  router.post('/api/user/register', controller.user.register);
  router.post('/api/user/login', controller.user.login);
  //接口拦截
  router.post('/api/user/detail', userExist, controller.user.detail);
  router.post('/api/user/logout', controller.user.logout);
  router.post('/api/user/edit', controller.user.edit);
  router.post('/api/commons/citys', controller.commons.citys);
  router.post('/api/house/hot', controller.house.hot);
  router.post('/api/house/search', controller.house.search);
  router.post('/api/house/detail', controller.house.detail);
  router.post('/api/comments/add', controller.comment.add);
  router.post('/api/comments/lists', controller.comment.lists);
  router.post('/api/orders/hasOrder', userExist, controller.orders.hasOrder);
  router.post('/api/orders/addOrder', userExist, controller.orders.addOrder);
  router.post('/api/orders/delOrder', userExist, controller.orders.delOrder);
  router.post('/api/orders/lists', userExist, controller.orders.lists);
  router.post('/api/orders/pay', userExist, controller.orders.pay);
};
