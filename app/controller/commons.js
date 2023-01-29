const Controller = require('egg').Controller;
const BaseController = require('./base');

class CommonsController extends BaseController {
  async citys() {
    const { ctx, app } = this;
    try {
      const result = await new Promise(resolve => {
        resolve({
          status: 200,
          citys: [[{ label: '黄岛区', value: '10001' }, { label: '市南区', value: '10002' }, { label: '城阳区', value: '10003' }, { label: '市北区', value: '10004' }, { label: '李沧区', value: '10005' }]]
        })
      })
      console.log(result)
      if (result.status === 200) {
        this.success(result.citys);
      } else {
        this.error('获取城市数据失败');
      }
    } catch (error) {
      this.error('获取城市数据失败');
    }
  }
}

module.exports = CommonsController;