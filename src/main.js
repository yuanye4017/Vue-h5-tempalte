import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
// 重置css样式
import 'normalize.css/normalize.css'
// global css 全局公用js
import '@/styles/index.scss'
// 移动端适配方案
import 'amfe-flexible/index.js'
// 解决click事件300ms延迟
import fastClick from 'fastclick'
fastClick.attach(document.body)

import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
