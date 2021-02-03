const webpack = require('webpack');
const {merge} = require('webpack-merge');
// const path = require('path');

const commonConfig = require('./webpack.common');

module.exports = merge(commonConfig, {
  mode: 'development',
  // 开发环境本地启动的服务配置
  devServer: {
    host: "127.0.0.1",
    port: 6600,
    hot: true,
    open: true,
    historyApiFallback: true,
    compress: true,
    // 接口代理转发
    proxy: {
      '/api': {
        target: 'http://192.168.27.9:8080',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }     
    }    
  },
  plugins: [ new webpack.HotModuleReplacementPlugin()],
  devtool: 'eval-source-map',
  optimization: {
    moduleIds: 'named',
  },
});
