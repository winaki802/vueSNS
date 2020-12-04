module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  devServer: {
    port: 8081,
    proxy: {
      "/ktgProject/*": {
        target: "http://10.20.226.111:8080",
        changeOrigin: true,
        ws: true
      },    
    }
  }

}