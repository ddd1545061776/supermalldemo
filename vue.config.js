module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'components': '@/components',
        'common': '@/common',
        'network': '@/network',
      }
    }
  },
  devServer: {
    public: '192.168.0.108',
    port: '8888',
    // assetsSubDirectory: 'static',
    // assetsPublicPath: './',
    // index: 'homework.html',
    proxy: {
      "/api": {
        target: "22",
        pathRewrite: {
          "^/api": ""
        },
        ws: true,
        changeOrigin: true
      }
    }
  },
}