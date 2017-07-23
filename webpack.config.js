const { resolve } = require('path');

module.exports = {
    entry: [
        // 'babel-polyfill',
        './index'
    ],
    context: resolve('src'),
    output: {
        filename: 'bundle.js',
        path: resolve('public')
    },
    devtool: 'inline-source-map',
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /.jsx?$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /.css$/,
                use: ['style-loader', 'css-loader'],
                exclude: /node_modules/
            }
        ]
    },
    stats: {
        color: true
    }
}
