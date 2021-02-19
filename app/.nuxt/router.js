import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from '@nuxt/ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _a81b68b2 = () => interopDefault(import('../pages/app.vue' /* webpackChunkName: "pages/app" */))
const _4b01347c = () => interopDefault(import('../pages/test.vue' /* webpackChunkName: "pages/test" */))
const _153d0466 = () => interopDefault(import('../pages/test2.vue' /* webpackChunkName: "pages/test2" */))
const _42205e30 = () => interopDefault(import('../pages/todo.vue' /* webpackChunkName: "pages/todo" */))
const _162d77a6 = () => interopDefault(import('../pages/work/_id.vue' /* webpackChunkName: "pages/work/_id" */))
const _2dfb1658 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/app",
    component: _a81b68b2,
    name: "app"
  }, {
    path: "/test",
    component: _4b01347c,
    name: "test"
  }, {
    path: "/test2",
    component: _153d0466,
    name: "test2"
  }, {
    path: "/todo",
    component: _42205e30,
    name: "todo"
  }, {
    path: "/work/:id?",
    component: _162d77a6,
    name: "work-id"
  }, {
    path: "/",
    component: _2dfb1658,
    name: "index"
  }],

  fallback: false
}

function decodeObj(obj) {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = decode(obj[key])
    }
  }
}

export function createRouter () {
  const router = new Router(routerOptions)

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    const r = resolve(to, current, append)
    if (r && r.resolved && r.resolved.query) {
      decodeObj(r.resolved.query)
    }
    return r
  }

  return router
}
