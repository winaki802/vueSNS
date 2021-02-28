module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  devServer: {
    port: 8081,
    disableHostCheck: true,
    compress: true,
    inline: true,
    allowedHosts: [
      '.ktgga.com'
    ],

    proxy: {
      "/ktgProject/*": {
        target: "http://10.20.225.31:8000",
        changeOrigin: true,
        ws: true
      },    
    }
  }

}