module.exports={
  configureWebpack:{
    resolve:{
      alias:{
        'assets':'@/assets',
        'components':'@/components',
        'common':'@/common',
        'network':'@/network',
      }
    }
  },
  devServer: {
    public: '192.168.0.107',
    port: '8888',
    // index: 'homework.html',
    proxy: {
      "/api": {
        target: "22222",
        pathRewrite: {
          "^/api": ""
        },
        ws: true,
        changeOrigin: true
      }
    }
  },
}