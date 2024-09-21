const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,

  devServer: {
    host: '10.10.10.11',  // กำหนด IP Address ของคุณ
    port: 8080,           // กำหนดพอร์ตที่คุณใช้
  }
});
