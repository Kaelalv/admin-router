module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target:
          "https://www.easy-mock.com/mock/5d6795d3f8688c218221c819/questions",
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  }
};
