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
  config.middleware = ['httpLog'];

  config.httpLog = {
    type: 'all'
  };

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
    maxAge: 1000 * 5,
    renew: true
  };

  config.auth = {
    exclude: ['/api/user/login', '/api/user/register']
  };

  config.mysql = {
    app: true,
    agent: false,
    client: {
      host: '127.0.0.1',
      port: '3306',
      user: 'root',
      password: 'ljr20010425',
      database: 'egg'
    }
  };

  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: 'ljr20010425',
    database: 'egg_house',
    define: {
      timestamps: false,
      freezeTableName: true
    }
  };

  config.jwt = {
    secret: 'liuJiaRui',
  };

  config.redis = {
    client: {
      port: 6379,
      host: '127.0.0.1',
      password: 'ljr20010425',
      db: 0
    }
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    salt: 'LJR',
    redisExpire: 60 * 60 * 24
  };

  return {
    ...config,
    ...userConfig,
  };
};
