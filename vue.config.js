// const utils = require('./utils/utils');
const Timestamp = new Date().getTime();
const cbimConf = require('./utils/cbim.vue.Intermediate.js');
const path = require('path');
const resolve = (dir) =>{
    return path.join(__dirname, dir);
}
// 分析工具
const AnalyzerKey = false;
const Analyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// Gzip压缩
const CompressionWebpackPluginKey = true;
const CompressionWebpackPlugin = require('compression-webpack-plugin');
module.exports = {
  // 模块化打包工具 - 2
  publicPath: cbimConf.publicPath,
  outputDir: cbimConf.outputDir,
  assetsDir: cbimConf.assetsDir,
  pages: cbimConf.pages,
  productionSourceMap: false,
  // 用于测试的代理服务
  devServer: {
    index: 'index-index.html',
    port: 8120,
    // https: true,
    // proxy: 'http://10.80.2.11:8050/', //设计协同平台
      proxy:{
          '/node/api':{
              target:'http://127.0.0.1:3001/' //本机
          },
          '/api':{
             target:'http://10.80.2.11:8050/' //设计协同平台
          }
      }
  },
  // 约束打包大小的 webpack 配置
  configureWebpack: config => {
      // 拆包
      config.optimization = {
        runtimeChunk: {
            name: 'runtime',
        },
        splitChunks: {
        minSize: 102400,
        minChunks: 2,
        cacheGroups: {
            lib: {
                name: 'lib',
                test: /[vue|iview]/,
                priority: 0,
                chunks: 'all',
            },
            common: {
                name: 'common',
                chunks: 'initial',
            },
        },
        },
    };

    // 分析插件
    AnalyzerKey ? config.plugins.push(new Analyzer()) : false;
    return {
        output: {
            // 输出重构  打包编译后的 文件名称  【模块名称.版本号.时间戳】
            filename: `js/[name].${Timestamp}.js`,
            chunkFilename: `js/[name].${Timestamp}.js`,
        },
    };

    // 打包Gzip压缩
    CompressionWebpackPluginKey
      ? config.plugins.push(
          new CompressionWebpackPlugin({
            filename: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp('\\.(js|css)$'),
            threshold: 10240,
            minRatio: 0.8,
          }),
        )
      : false;
  },
};
