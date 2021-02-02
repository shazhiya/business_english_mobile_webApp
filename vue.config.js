const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}


module.exports =  {
    publicPath: '',
    lintOnSave: true,
    chainWebpack: (config) => {
      config.resolve.alias
        .set('view',resolve('src/views'))
        .set('component',resolve('src/components'))
        .set('asset',resolve('src/assets'))
    },
    devServer: {
        port: 80,
        host:'0.0.0.0',
        proxy: {
          'back/': {
            target: 'http://localhost:9090',
            changeOrigin: true,
            pathRewrite: {
              '^/back': ''
            }
          }
        }
    }
}




