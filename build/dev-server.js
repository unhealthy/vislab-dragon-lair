'use strict';
const express = require('express');
const webpack = require('webpack');
const config = require('../config');
const proxyMiddleware = require('http-proxy-middleware');
const webpackConfig = process.env.NODE_ENV === 'testing'
    ? require('./webpack.prod.conf')
    : require('./webpack.dev.conf');

// default port where dev server listens for incoming traffic
const port = process.env.PORT || config.dev.port;
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
const proxyTable = config.dev.proxyTable;

const app = express();
const compiler = webpack(webpackConfig);

const devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: {
        colors: true,
        chunks: false,
    },
});

const hotMiddleware = require('webpack-hot-middleware')(compiler);

// proxy api requests
Object.keys(proxyTable).forEach((context) => {
    let options = proxyTable[context];
    if (typeof options === 'string') {
        options = { target: options };
    }
    app.use(proxyMiddleware(context, options));
});

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')());

// serve webpack bundle output
app.use(devMiddleware);

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware);

// serve pure static assets
// remove the first '.' in config.build.assetsPublicPath
const staticPath = config.dev.assetsPublicPath + config.dev.assetsSubDirectory;
app.use(staticPath, express.static('./static'));

/* eslint no-console:0 */
module.exports = app.listen(port, (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(`Listening at http://localhost:${port}\n`);
});
