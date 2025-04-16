import { createApp } from 'vue'
import './style.css'
// import App from './App.vue'
import App from './views/login/index.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 导入全局样式
import './styles/index.scss'

// import router from '@/router/index.js'; // 导入路由配置
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
// app.use(router); // 使用路由
app.use(ElementPlus).mount('#app')