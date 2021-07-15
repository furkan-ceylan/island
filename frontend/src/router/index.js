import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/auth/Login.vue'
import Signup from '../views/auth/Signup.vue'
import PostDetail from '../views/PostDetail.vue'
import Profile from '../views/Profile.vue'

const requireAuth = (to, from, next) => {
  let user = localStorage.getItem('token')
  if (!user) {
    next({
      path: '/login',
      query: { redirect: to.fullPath },
    })
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

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
