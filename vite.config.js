//脚手架配置文件

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {fileURLToPath,URL} from 'url'

console.log(new URL("./src",import.meta.url))
console.log(fileURLToPath(new URL("./src",import.meta.url)))
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve:{
    alias:{
      // "@":项目src文件夹下的绝对路径
      "@":__dirname+"/src"
    }
  },
  server:{
    host:"0.0.0.0",
    port:3100
    
  }
})
