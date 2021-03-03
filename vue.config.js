module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],

  pwa: {
    workboxPluginMode: "GenerateSW",
    workboxOptions: {
      runtimeCaching: [{
        urlPattern: /\.png$/,
        handler: 'cacheFirst',
        options: {
          cacheName: 'png-chche',
          expiration: {
            maxEntries: 20,
            maxAgeSeconds: 60 * 60 * 24 * 365,
          }
        }           
      },
      {
        urlPattern: /\.json$/,
        handler: 'staleWhileRevalidatre',
        options: {
          cacheName: 'json-cache',
          cacheableResponse: { statuses: [200]}
        },
      }
    ],
    } 
  },

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