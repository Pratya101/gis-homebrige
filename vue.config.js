module.exports = {
  transpileDependencies: ["vuetify"],
  publicPath: "./",
  devServer: {
    proxy: "http://13.250.101.172:5000/",
  },
};
