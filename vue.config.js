const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: ["vuetify"],
  devServer: {
    proxy: {
      "/hotpepper": {
        // プロキシのエンドポイントを指定
        target: "https://webservice.recruit.co.jp", // 対象のAPIエンドポイント
        changeOrigin: true,
      },
      "/api": {
        target: "http://localhost:3000", // ExpressサーバーのURL
        changeOrigin: true,
        // pathRewrite: {
        //   "^/api": "", // '/api'を取り除く
        // },
      },
    },
  },

  pluginOptions: {
    express: {
      shouldServeApp: true,
      serverDir: "./srv",
    },
  },
});