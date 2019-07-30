'use strict'
const path = require('path')
const assetsDir = ''
const Timestamp = new Date().getTime()

function getAssetPath (assetsDir, filePath) {
  return assetsDir
    ? path.posix.join(assetsDir, filePath)
    : filePath
}
 module.exports = {
  lintOnSave: false,
  productionSourceMap: true,
  chainWebpack: (config) => {
    const filename = getAssetPath(
      assetsDir,
      `js/[name].${Timestamp}.js`
    )
    config.mode(process.env.NODE_ENV).output.filename(filename).chunkFilename(filename)
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