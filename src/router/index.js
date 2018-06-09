import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/Layout/Layout'
import Lockr from 'lockr'
import { Loading } from 'element-ui'

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

async function init() {
  let loadingInstance = Loading.service({})
  const local = Lockr.get('local') || 'shanghai'
  const locale = Lockr.get('locale') || 'zh-hans'
  router.app.$options.store.dispatch('setLocal', local)
  router.app.$options.store.dispatch('setLocale', locale)

  await router.app.$options.store.dispatch('getDestinationsList')

  loadingInstance.close()
}

router.beforeEach(async (to, from, next) => {
  await init()
  next()
})

export default router
