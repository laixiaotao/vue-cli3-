const path = require('path')

module.exports = {
  publicPath:'./',
  outputDir:'buildFiles',
  assetsDir:'static',
  chainWebpack: config => {
    config.module
      .rule('svg')
      .uses.clear()
    config.module
      .rule('svg1')
      .test(/\.svg$/)
      .use('svg-sprite')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
      .include
      .add(path.join(__dirname, 'src/assets/icons'))
      .end()
  }
}