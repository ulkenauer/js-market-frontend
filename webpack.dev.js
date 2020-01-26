const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    output: {
        filename: '[name].[hash].js',
    },
    devServer: {
        contentBase: './dist',
        historyApiFallback: true
    },
});