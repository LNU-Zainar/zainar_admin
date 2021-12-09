import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'
import List from './pages/List.vue'
import Add from './pages/Add.vue'
import UserList from './pages/UserList.vue'
import Login from './pages/Login.vue'
import NotFound from './pages/NotFound.vue'
import Category from './pages/Category.vue'
import Location from './pages/Location.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    redirect: '/list'
  },
  {
    path: '/list',
    name: 'list',
    component: List,
    meta: {
      title: '招领信息'
    },
    children: [
      {
        name: 'post',
        path: 'post/:id',
        meta: {
          title: '详情'
        }
      }
    ]
  },
  {
    path: '/category',
    name: 'category',
    component: Category,
    meta: {
      title: '分类信息'
    }
  },
  {
    path: '/location',
    name: 'location',
    component: Location,
    meta: {
      title: '地点信息'
    }
  },
  {
    path: '/edit/:id',
    name: 'edit',
    component: Add,
    meta: {
      title: '编辑',
      requireAuth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      title: '登录注册'
    }
  },
  {
    path: '/user',
    name: 'user',
    alias: '/',
    component: UserList,
    meta: {
      title: '用户信息',
      requireAuth: true
    },
    children: [
      {
        name: 'user-post',
        path: 'posts/:id',
        meta: {
          title: '详情'
        }
      }
    ]
  },
  {
    path: '*',
    name: '404',
    component: NotFound,
    meta: {
      title: '404'
    }
  }
]

const router = new VueRouter({
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (to.hash) {
        return {
          selector: to.hash
        }
      }
    }
  }
})

router.onError(() => {
  console.log('onError')
  router.app.$Progress.finish()
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  if (store.getters.isLogin && to.name === 'login') {
    next(false)
  } else {
    router.app.$Progress.start()
    next()
  }
})

router.afterEach(() => {
  router.app.$Progress.finish()
})

router.beforeEach((to, from, next) => {
  if (store.getters.isLogin || to.name === 'login') {
    next()
  } else {
    store.dispatch('queryUser').then(() => {
      next()
    }, () => {
      if (from.name === 'login') {
        router.app.$Progress.finish()
      }
      next({
        name: 'login',
        query: {
          from: to.fullPath
        }
      })
    })
  }
})

export default router
