import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/Layout/Layout'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/forecast'
    },
    {
      path: '/',
      component: Layout,
      name: 'home',
      children: [
        {
          path: 'forecast',
          component: () => import('@/page/forecast/index')
        },
        {
          path: 'history',
          component: () => import('@/page/history/index')
        },
        {
          path: 'live',
          component: () => import('@/page/live/index')
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  router.app.$options.store.dispatch('setLocal', 'shanghai')
  next()
})

export default router
