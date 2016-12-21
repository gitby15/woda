/**
 * Created by timl on 2016/12/19.
 */
var webpack = require('webpack');

module.exports = {
    //页面入口文件配置
    entry: {
        index : './src/index.js'
    },
    //入口文件输出配置
    output: {
        path: 'dist/',
        publicPath:'dist/',
        filename: '[name].js'
    },
    module: {
        //加载器配置
        loaders: [
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.js$/, loader: 'babel-loader' },
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'},
            { test:/\.html$/,loader:'html-loader'}
        ]
    }
};