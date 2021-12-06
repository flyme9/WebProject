import Vue from 'vue'
import VueRouter from 'vue-router'
import movieRouter from './movie'
import cinemaRouter from './cinema'
import mineRouter from './mine'

Vue.use(VueRouter)

const routes = [
  movieRouter,
  cinemaRouter,
  mineRouter,
  // 路由重定向
  {
    path:'/*',
    redirect: '/movie'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: 'miaomaio',
  routes
})

export default router
