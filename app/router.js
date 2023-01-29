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


};
