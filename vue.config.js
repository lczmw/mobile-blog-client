const pxtorem = require('postcss-pxtorem')
const port = 9009
module.exports = {
  outputDir: 'dist',
  assetsDir: 'static',
  publicPath: process.env.NODE_ENV === 'production' ? '//imgw.pospal.cn/unionPaySign' : '/',
  devServer: {
    port: port,
    open: false,
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:3000/',
    //     // target: 'http://192.168.2.197:29429/',
    //     secure: false,
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^/api': ''
    //     }
    //   },
    //   '/socket.io': {
    //     target: 'http://localhost:3000/',
    //     // target: 'http://192.168.2.197:29429/',
    //     secure: false,
    //     changeOrigin: true,
      
    //   }
    // },
    disableHostCheck: true,
  },
  lintOnSave: false,
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          pxtorem({
            rootValue: 20,
            propList: ['*'],
            selectorBlackList: ['mint']
          })
        ]
      }
    }
  }
}

