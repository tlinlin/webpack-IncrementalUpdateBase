var path = require('path');
var webpack = require("webpack");
const WepackMd5Hash = require('webpack-md5-hash');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({size:os.cpus().length});
module.exports = {
    entry: {
        one: "./src/js/one.js",
        two: "./src/js/two.js",
        common:['./src/js/common/a.js', './src/js/common/fitScreen.js'],
    },
    output: {
        publicPath: '',
        path: path.resolve(__dirname, 'dist'),
        filename: "js/[name].[chunkhash:6].js"
    },
    module:{
        rules:[{
            test: /\.(css|scss)$/,
            exclude: /node_modules/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: ["happypack/loader?id=postcss"],
                publicPath: '../'
            })
        },
        {
            test: /\.js[x]?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'happypack/loader?id=happybabel',
            // include: path.join(__dirname, 'static/assets/js')
        },{
            test: /\.(png|gif|jpg|svg|jpeg)$/i,
            use: [{
              loader: 'file-loader',
              options: {
                name: 'images/[name].[ext]',
                limit: 25000
              }
            }]
          }, {
            test: /\.(woff2|woff|eot|svg|ttf|otf)(\?.*)?$/i,
            use: [{
              loader: 'url-loader',
              options: {
                name: '[name]',
                outputPath: 'font/',
                limit: 25000
              }
            }]
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
        new HappyPack({
            id: 'happybabel',
            loaders: ['babel-loader?cacheDirectory=true'],
            threadPool: happyThreadPool,
            // cache: true,
            verbose: true
        }),
        new ExtractTextPlugin("css/[name].[contenthash:8].css"),
        new WepackMd5Hash(),
        new webpack.HashedModuleIdsPlugin(),
        new CleanWebpackPlugin(['dist']),
        new HappyPack({
            id: 'postcss',
            loaders: [{ loader: 'css-loader', options: { importLoaders: 1 } },'sass-loader', 'postcss-loader'],
            threadPool: happyThreadPool,
            verbose: true,
        }),
        new HtmlWebpackPlugin({
            title: 'base',
            template: `./src/index.html`, // 源模板文件
            filename: `./index.html`, // 输出文件【注意：这里的根路径是module.exports.output.path】
            inject: 'body',
            // chunks: ['vendor', `${name}`]
          })
]
};