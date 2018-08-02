import Layout from '@/components/Layout/Layout'
import { Loading } from 'element-ui'
import Lockr from 'lockr'
import Vue from 'vue'
import Router from 'vue-router'
/*  */
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/forecast'
    },
    {
      path: '/report',
      name: 'report',
      component: Layout,
      children: [
        {
          path: '/',
          component: () => import('@/page/report/index'),
          children: [
            {
              path: '/',
              alias: 'home',
              component: () => import('@/page/report/home')
            },
            {
              path: 'day',
              component: () => import('@/page/report/day')
            },
            {
              path: 'day/:date',
              component: () => import('@/page/report/day')
            },
            {
              path: 'year',
              component: () => import('@/page/report/year')
            },
            {
              path: 'year/:year',
              component: () => import('@/page/report/year')
            },
            {
              path: 'month',
              component: () => import('@/page/report/month')
            },
            {
              path: 'month/:date',
              component: () => import('@/page/report/month')
            }
          ]
        }
      ]
    },
    {
      path: '/',
      component: Layout,
      name: 'home',
      children: [
        {
          path: 'home',
          component: () => import('@/page/home/index')
        },
        {
          path: 'ticket',
          component: () => import('@/page/ticket/index')
        },
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
        },
        {
          path: 'about',
          component: () => import('@/page/about/index')
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

  dispatch('getDestinationsList')

  loadingInstance.close()

  if (local !== 'shanghai') {
    if (to.path === '/forecast' || to.path === '/ticket') {
      router.push({ path: 'history' })
    }
  }
}

router.beforeEach(async (to, from, next) => {
  await init(to)
  next()
})

export default router
