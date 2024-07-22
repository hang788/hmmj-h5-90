import Vue from 'vue'
import VueRouter from 'vue-router'
import { getToken } from '@/utils/storage'
import { Toast } from 'vant'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/article'
  },
  {
    path: '/register',
    component: () => import('@/views/Register.vue')
  },
  {
    path: '/login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/detail/:id',
    component: () => import('@/views/Detail.vue')
  },
  // 嵌套路由
  {
    path: '/',
    component: () => import('@/views/Layout.vue'),
    children: [
      {
        path: '/article',
        component: () => import('@/views/Layout/Article.vue')
      },
      {
        path: '/collect',
        component: () => import('@/views/Layout/Collect.vue')
      },
      {
        path: '/like',
        component: () => import('@/views/Layout/Like.vue')
      },
      {
        path: '/user',
        component: () => import('@/views/Layout/User.vue')
      }
    ]
  },
  {
    path: '*',
    component: () => import('@/views/not-found.vue')
  }
]

const router = new VueRouter({
  routes
})

const whiteList = ['/login', '/register']

// 导航守卫 => 全局前置守卫
router.beforeEach((to, from, next) => {
  /**
   * to: 到哪里去
   * from: 从哪里来
   * next: 下一步
   * next() => 放行
   * next(false) => 中断当前导航
   * next('/login') => 强制跳转到指定页面
   *
   */
  const token = getToken()
  if (token) {
    next()
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      Toast.fail('你还未登录，请先登录')
      next('/login')
    }
  }
})

export default router
