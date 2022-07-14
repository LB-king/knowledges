import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// 编辑器红色波浪线报错，安装@types/node
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@@': resolve(__dirname, 'src') //设置@指向src目录
    }
  },
  base: './'
})
