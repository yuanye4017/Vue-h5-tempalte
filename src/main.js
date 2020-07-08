import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
// 移动端适配方案
import 'amfe-flexible/index.js'

import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
