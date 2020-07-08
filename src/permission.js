import Vue from 'vue'
import router from './router'
import NProgress from 'nprogress' // progress bar -- 页面加载进度条
import 'nprogress/nprogress.css' // progress bar style -- 页面加载进度条
import store from './store'
import { getToken } from '@/utils/auth' // get token from cookie -- 控制token
import getPageTitle from '@/utils/get-page-title' // 项目的标题

import { Toast } from 'vant'
Vue.use(Toast)

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar -- 开始加载
  NProgress.start()

  // set page title -- 获取标题
  document.title = getPageTitle(to.meta.title)
  // 添加keepalive
  store.dispatch('keepAlive/addKeepAlive', to)
  // determine whether the user has logged in -- 获取token
  const hasToken = getToken()
  if (hasToken) { // 如果token存在
    if (to.path === '/login') { // 路由跳转的是登陆 重定向 主页
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else { // 跳转的非主页
      next()
      NProgress.done()
    }
  } else { // 如果没有token信息
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
