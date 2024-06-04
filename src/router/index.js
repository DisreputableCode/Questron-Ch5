import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'

export default function (/* { store, ssrContext } */) {
  const router = createRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,
    history: process.env.VUE_ROUTER_MODE === 'history'
      ? createWebHistory(process.env.VUE_ROUTER_BASE)
      : createWebHashHistory(process.env.VUE_ROUTER_BASE)
  })

  return router
}
