import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/Layout/Layout'
import Lockr from 'lockr'

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

router.beforeEach(async (to, from, next) => {

  const local = Lockr.get('local') || 'shanghai'

  router.app.$options.store.dispatch('setLocal', local)
  router.app.$options.store.dispatch('setLocale', 'zh-hans')

  await router.app.$options.store.dispatch('getDestinationsList')
  next()
})

export default router
