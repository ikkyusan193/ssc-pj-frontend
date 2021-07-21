module.exports = {
  transpileDependencies: ['vuetify'],
  devServer: {
    host: "localhost",
    disableHostCheck: true,
    port: 3000,
    https: false,
    proxy: {
      '/api': {target: 'http://localhost:8080'
      },
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "Origin, X-Requested-With, content-type, Authorization",
    },
  },
};