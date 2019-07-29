import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/login/index.vue'
import Index from './views/index.vue'
import thisRouter from './utils/routePath.js'
import userPt from './views/userPt/userPt.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: '/userPt',
      name: 'userPt',
      component: userPt,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      children: thisRouter,
      
    }
  ]
})
