'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')
function resolve(dir) {
  return path.join(__dirname, dir)
}

// 项目的标题
const name = defaultSettings.title || 'Mobile Template' // page title
// 端口号
const port = process.env.port || process.env.npm_config_port || 8080 // dev port
module.exports = {
  publicPath: './',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development', // 编译警告
  productionSourceMap: false, // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建
  devServer: {
    port: port, // 端口号
    open: true,
    overlay: {
      // 让浏览器 overlay 同时显示警告和错误
      warnings: false,
      errors: true
    },
    proxy: { // 设置反向代理
      // change xxx-api/login => mock/login
      [process.env.VUE_APP_BASE_API]: {
        target: `https://easy-mock.bookset.io/mock/5ecb8ea706ed8f4cbd6ac047`,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: '/api'
        }
      }
    }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, 'src/styles/_variables.scss')
      ]
    }
  },
  configureWebpack: {
    // 对于webpack简单的配置方式
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {
        // 自定义文件路径简写
        '@': resolve('src')
      }
    }
  },
  chainWebpack(config) {
    // 对于webpack高级配置（链式操作）
    config.plugins.delete('preload') // TODO: need test
    config.plugins.delete('prefetch') // TODO: need test

    // set svg-sprite-loader
    config.module // svg-sprite-loader 将加载的 svg 图片拼接成 雪碧图，放到页面中，其它地方通过 <use> 复用
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    // set preserveWhitespace
    config.module // 去掉元素之间的空格
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()

    config
      // https://webpack.js.org/configuration/devtool/#development
      .when(process.env.NODE_ENV === 'development', config =>
        config.devtool('cheap-source-map')
      )

    config.when(process.env.NODE_ENV !== 'development', config => {
      config
        .plugin('ScriptExtHtmlWebpackPlugin')
        .after('html')
        .use('script-ext-html-webpack-plugin', [
          {
            // `runtime` must same as runtimeChunk name. default is `runtime`
            inline: /runtime\..*\.js$/
          }
        ])
        .end()
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            //  只打包初始时依赖的第三方 name ：打包后的文件名  test：规则
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial' // only package third parties that are initially dependent
          },
          vantUI: {
            // 单独将 vant 拆包
            name: 'chunk-vantUI', // split vantUI into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?vant(.*)/ // in order to adapt to cnpm
          },
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true
          }
        }
      })
      config.optimization.runtimeChunk('single')
    })
  }
}
