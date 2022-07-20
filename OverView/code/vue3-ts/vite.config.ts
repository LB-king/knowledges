import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// 编辑器红色波浪线报错，安装@types/node
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src') //设置@指向src目录
    }
  },
  base: './',
  server: {
    port: 3000, //设置服务器启动的端口号
    open: true, //是否在服务启动时打开浏览器
    cors: true, //是否允许跨域
    proxy: {
      '/api': {
        target: 'http://xxx.com',
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace('/api', '/')
      }
    }
  }
})
