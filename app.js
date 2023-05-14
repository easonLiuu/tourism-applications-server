module.exports = app => {
    const store = {}
    app.sessionStore = {
        async get(key) {
            console.log('store', store)
            return store[key];
        },
        async set(key, value, maxAge) {
            store[key] = value;

        },
        async destroy(key) {
            store[key] = null
        },
    };
    const mids = app.config.coreMiddleware
    app.config.coreMiddleware = [...mids, ...[
        'allowHosts',
        'notFound',
        'auth'
    ]]
    // app.config.coreMiddleware.push('allowHosts');
    // app.config.coreMiddleware.push('notFound');
    // app.config.coreMiddleware.push('auth');
    // console.log(app.config.coreMiddleware)
    
}