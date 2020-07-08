import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '../layout' // 布局页面--为页面的总体布局

export const constantRoutes = [ // 这是路由的集合 注意Layout的出现
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/redirect/:path(.*)',
    name: 'edirect',
    component: () => import('@/views/redirect')
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/home/index.vue'),
        name: 'Home',
        meta: {
          title: '首页'
        }
      }
    ]
  },
  {
    path: '/icon',
    component: Layout,
    redirect: '/icon/index',
    children: [
      {
        path: 'index',
        component: () => import(/* webpackChunkName: "svgIcon" */ '@/views/svg-icons'),
        name: 'SvgIcon',
        meta: {
          title: 'icon'
        }
      }
    ]
  },
  {
    path: '/404',
    name: 'Page404',
    component: () => import(/* webpackChunkName: "page404" */ '@/views/404'),
    meta: {
      title: '404'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/login'),
    meta: {
      title: '登陆'
    }
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }), // 当切换到新路由时，想要页面滚到顶部
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
