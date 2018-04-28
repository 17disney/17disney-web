import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/page/Index'
import Layout from '@/components/Layout/Layout'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/',
      component: Layout,
      name: 'home',
      children: [
        {
          path: 'index',
          component:  Index
        }
      ]
    }
  ]
})
