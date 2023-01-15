'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  async detail(id) {
    return {
      id,
      name: 'Sam',
      age: 18,
    };
  }
}

module.exports = UserService;
