const Service = require('egg').Service;
const BaseService = require('./base')

class HouseService extends BaseService {
  commonAttr(app){
    return {
        order: [
            ['showCount', 'DESC']
        ],
        attributes: {
            exclude: ['startTime', 'endTime', 'publishTime']
        },
        include: [
            {
                model: app.model.Imgs,
                limit: 1,
                attributes: ['url']
            }
        ]
    }
  }


  async hot() {
    return this.run(async (ctx, app) => {
        const result = await ctx.model.House.findAll({
            ...this.commonAttr(app),
            limit: 4,         
        });
        return result;
    })

  }

  async search(params) {
    return this.run(async (ctx, app) => {
        const { lte, gte } = app.Sequelize.Op;
        const where = {
            cityCode: Array.isArray(params.code) ? params.code[0] : params.code,
            startTime: {
                [lte]: params.startTime
            },
            endTime: {
                [gte]: params.endTime
            }
        };
        const result = await ctx.model.House.findAll({
            ...this.commonAttr(app),
            limit: 8, 
            offset: (params.pageNum - 1) * params.pageSize,
            where
        });
        return result;
    })
  }
}

module.exports = HouseService;