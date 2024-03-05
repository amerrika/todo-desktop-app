const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  devServer: {
    port: 3031,
  },
  transpileDependencies: true,
});
