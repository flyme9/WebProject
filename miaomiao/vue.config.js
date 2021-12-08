// vue项目配置文件
module.exports = {
  // 配置公共文件名
  publicPath:'/miaomiao',
  // 配置反向代理
  devServer: {
    proxy: {
      '/api': {
        target: 'https://i.maoyan.com',
        changeOrigin: true,
      },
      '/apollo':{
        target:'https://i.maoyan.com',
        changeOrigin:true
      },
      '/ajax1': {                         //请求方式
        target: 'https://m.maoyan.com',   //网络地址
        changeOrigin: true,
        pathRewrite: {
          '^/ajax1': '/ajax'
        }
      },
      '/ajax2':{
        target:'https://i.maoyan.com',
        changeOrigin:true,
        pathRewrite: {
          '^/ajax2': '/ajax'
        }
      }
    }
  }
}
