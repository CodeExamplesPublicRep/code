const config = {
    dev: {
        address: '127.0.0.1',
        port: '3000',
        mimes: ['.jpg', '.ico', '.png', '.html', '.txt', '.css', '.js']
    },
    prod: {
        address: '',
        port: '3000',
        mimes: ['.jpg', '.ico', '.png', '.html', '.txt', '.css', '.js']
    },
    currentEnv: 'dev',
    getCurrentConfig: function () {
        return this[this.currentEnv]
    },
    setCurrentEnv: function (env) {
        this.currentEnv = env
    }
}

module.exports = config


