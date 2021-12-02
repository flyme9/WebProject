// vue项目配置文件
module.exports = {
  // 配置反向代理
  devServer: {
    proxy: {
      '/api': {
        target: 'https://i.maoyan.com',
        changeOrigin: true,
      },
      '/apollo': {
        target: 'https://i.maoyan.com',
        changeOrigin: true,
      },
      '/ajax':{
        target: 'https://i.maoyan.com',
        changeOrigin: true,
      }
    }
  }
}
