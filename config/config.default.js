/* eslint valid-jsdoc: "off" */

'use strict';

const path = require('path');

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1673709959396_1553';

  // add your middleware config here
  config.middleware = [];

  config.security = {
    csrf: {
      enable: false,
    },
  };

  config.view = {
    mapping: {
      ".html": "ejs"
    },
    root: [
      path.join(appInfo.baseDir, "app/html"),
      path.join(appInfo.baseDir, "app/view")
    ].join(",")
  };

  config.ejs = {
    
  };

  config.static = {
    //默认目录 如果不指定下面的路径 把静态资源放在public里是可以的 但是指定路径就不可以
    prefix: "/assets/",
    //路径 从哪里去找
    dir: path.join(appInfo.baseDir, "app/assets")
  };

  config.session = {
    key: "LJR-SESS",
    httpOnly: false,
    maxAge: 1000 * 50,
    renew: true
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
