var path = require('path');
var webpack = require("webpack");
const WepackMd5Hash = require('webpack-md5-hash');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
module.exports = {
    entry: {
        one: "./src/js/one.js",
        two: "./src/js/two.js",
        common:['./src/js/a.js'],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "[name].[chunkhash:6].js"
    },
    module:{
        rules:[{
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: "css-loader"
            })
        }]
    },
    plugins:[
        new webpack.optimize.CommonsChunkPlugin({
            name: "common",
            minChunks:Infinity,
        }),
        new UglifyJSPlugin({
            parallel: true
        }),
        new ExtractTextPlugin("[name].[contenthash:8].css"),
        new WepackMd5Hash(),
        new webpack.HashedModuleIdsPlugin(),
        new CleanWebpackPlugin(['dist']),
    ]
};