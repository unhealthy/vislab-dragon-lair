// see http://vuejs-templates.github.io/webpack for documentation.
const path = require('path');

module.exports = {
    build: {
        index: path.resolve(__dirname, 'dist/index.html'),
        assetsRoot: path.resolve(__dirname, 'dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: './',
        productionSourceMap: true,
    },
    dev: {
        port: 8080,
        assetsRoot: path.resolve(__dirname, 'dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {},
    },
};
