import { createApp } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css' // vite配置已经配置引入ui样式
// import zhCn from 'element-plus/dist/locale/zh-cn.mjs'  // provider在app.vue已经配置
import 'dayjs/locale/zh-cn' // 日期和时间本地化

import App from './App.vue'
import router from './router'
import store from '@/store'
import initPlugins from './plugins'
import * as directives from './directives' //自定义指令

import '@/permission' // 路由跳转前后控制
import '@/styles/index.less'

console.log('import.meta.env.MODE:: ', import.meta.env.MODE)

// 创建App实例
const app = createApp(App)

// 自定义指令
Object.keys(directives).forEach((k) => app.directive(k, directives[k]))

// 导入所有图标并进行全局注册
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 注册ElementPlus
app.use(router).use(store).use(ElementPlus).mount('#app')

// 启动插件：Network监听
initPlugins(app)
