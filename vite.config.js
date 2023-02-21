import { defineConfig, splitVendorChunkPlugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createStyleImportPlugin, ElementPlusResolve as ElementPlusResolveStyle } from 'vite-plugin-style-import'
import { resolve } from 'path'

import eslintPlugin from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      // 按需加载ui element&antd&icon
      resolvers: [ElementPlusResolver()],
    }),
    createStyleImportPlugin({
      // 解决message和notification引入不生效问题
      resolves: [ElementPlusResolveStyle()],
    }),
    eslintPlugin(),
    splitVendorChunkPlugin(),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        // vite 配置全局 less 变量
        // https://www.jianshu.com/p/4a76d68e16ec
        // https://www.cnblogs.com/-roc/p/16212801.html
        // modifyVars: {
        //   hack: `true; @import (reference) "${resolve('src/assets/styles/color.less')}";`,
        // },
        //支持js引入.less文件
        javascriptEnabled: true,
      },
    },
  },
  server: {
    proxy: {
      '/vite-api': {
        target: 'http://jsonplaceholder.typicode.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/vite-api/, ''),
      },
    },
  },
  define: {
    'process.env': {},
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString()
          }
        },
      },
    },
  },
})
