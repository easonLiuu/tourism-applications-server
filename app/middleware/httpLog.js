const dayjs = require('dayjs');
const fs = require('fs');

module.exports = options => {
    //options是配置参数
    return async (ctx, next) => {
        const sTime = Date.now();
        const startTime = dayjs(Date.now()).format("YYYY-MM-DD HH:mm:ss");
        const req = ctx.request;
        await next();
        const log = {
            method: req.method,
            url: req.url,
            data: req.body,
            startTime,
            endTime: dayjs(Date.now()).format("YYYY-MM-DD HH:mm:ss"), 
            timeLength: Date.now() - sTime     
        };
        //console.log(log)
        const data = dayjs(Date.now()).format("YYYY-MM-DD HH:mm:ss") + " [httpLog] " + JSON.stringify(log) + '\r\n';
        fs.appendFileSync(ctx.app.baseDir + '/httpLog.log', data);
    }
}