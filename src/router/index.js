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

async function init(to) {
  const { dispatch, state } = router.app.$options.store

  if (state.app.init) return

  let loadingInstance = Loading.service({})

  const local = Lockr.get('local') || 'shanghai'
  const locale = Lockr.get('locale') || 'zh-hans'

  dispatch('setLocal', local)
  dispatch('setLocale', locale)

  await dispatch('getDestinationsList')

  loadingInstance.close()

  if (local !== 'shanghai' && to.path === '/forecast') {
    router.push({ path: 'history' })
  }
}

router.beforeEach(async (to, from, next) => {
  await init(to)
  next()
})

export default router
