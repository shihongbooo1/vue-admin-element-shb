'use strict'
const path = require('path')

function getAssetPath (assetsDir, filePath) {
  return assetsDir
    ? path.posix.join(assetsDir, filePath)
    : filePath
}
 module.exports = {
  lintOnSave: false,
  productionSourceMap: true,
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
    .use('svg-sprite-loader')
    .loader('svg-sprite-loader')
    .options({
      symbolId: 'icon-[name]'
    })
  },
  // 设置跨域代理
  devServer: {
    open: true,
    port: 8080,
    https: false,
    hotOnly: false,
    // proxy: { // 配置跨域
    //   '/dev': {
    //     target: 'http://192.168.3.29:8080/core/', //要访问的跨域的api的域名
    //     changOrigin: true,
    //     pathRewrite: {
    //       '^/dev': ''
    //     }
    //   }
    // },
    // before: app => {}
  }
 }