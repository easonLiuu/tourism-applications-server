module.exports = options => {
    return async (ctx, next) => {
        console.log('m1 start');
        await next();
        console.log('m1 end')
    }
}