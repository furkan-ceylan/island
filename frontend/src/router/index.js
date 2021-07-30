import {
  createRouter,
  createWebHistory,
  RouteRecordRaw,
  createWebHashHistory,
} from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/auth/Login.vue'
import Signup from '../views/auth/Signup.vue'
import PostDetail from '../views/PostDetail.vue'
import Profile from '../views/Profile.vue'
import axios from 'axios'
import store from '../store/index.js'

const requireAuth = (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    let user = localStorage.getItem('token')
    if (!user) {
      next({
        name: 'Login',
        query: { redirect: to.fullPath },
      })
    } else {
      next()
    }
  } else {
    next()
  }
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: requireAuth,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
  },
  {
    path: '/profile/:id',
    name: 'Profile',
    component: Profile,
    props: true,
    beforeEnter: requireAuth,
  },
  {
    path: '/post-detail/:id',
    name: 'PostDetail',
    component: PostDetail,
    props: true,
    beforeEnter: requireAuth,
  },
]

let isRefreshing = false
let subscribers = []

axios.interceptors.response.use(
  (response) => {
    return response
  },
  (err) => {
    const originalConfig = err.config
    const {
      config,
      response: { status, data },
    } = err
    const originalRequest = config

    // if (data.message === 'unauthorized' && !originalConfig._retry) {
    //   originalConfig._retry = true
    //   router.push({ name: 'Login' })
    //   return Promise.reject(false)
    // }

    // if (err.response.status == 401 && !originalConfig._retry) {
    //   originalConfig._retry = true
    // router.push({ name: 'Login' })
    //   return Promise.reject(false)
    // }

    if (status == 401 && data.message == 'unauthorized') {
      router.push({ name: 'Login' })
      // if (!isRefreshing) {
      //   isRefreshing = true
      //   store
      //     .dispatch('refreshToken')
      //     .then(({ status }) => {
      //       if (status == 200) {
      //         isRefreshing = false
      //       }
      //       subscribers = []
      //     })
      //     .catch((error) => {
      //       console.error(error)
      //     })
      // }

      // const requestSubscribers = new Promise((resolve) => {
      //   subscribeTokenRefresh(() => {
      //     resolve(axios(originalRequest))
      //   })
      // })

      // onRefreshed()

      // return requestSubscribers
    }
  }
)

function subscribeTokenRefresh(cb) {
  subscribers.push(cb)
}

function onRefreshed() {
  subscribers.map((cb) => cb())
}

subscribers = []

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
