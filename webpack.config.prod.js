const devConfig = require('./webpack.config');

devConfig.devtool = undefined;
devConfig.watch = false;

module.exports = devConfig;
