const Subscription = require('egg').Subscription;

class getInfo extends Subscription {
    static get schedule(){
        return {
            //interval: 3000,
            cron: '*/3 * * * * *',
            type: 'worker'
        }
    }

    async subscribe(){
        const info = this.ctx.info;
        console.log(Date.now(), info)
    }

}

module.exports = getInfo;