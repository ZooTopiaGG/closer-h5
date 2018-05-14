import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _b717ebb8 = () => import('../pages/sign/signin.vue' /* webpackChunkName: "pages/sign/signin" */).then(m => m.default || m)
const _ab5504ee = () => import('../pages/feed/_id.vue' /* webpackChunkName: "pages/feed/_id" */).then(m => m.default || m)
const _61214e28 = () => import('../pages/about/_id.vue' /* webpackChunkName: "pages/about/_id" */).then(m => m.default || m)
const _223c0f1a = () => import('../pages/group/_id.vue' /* webpackChunkName: "pages/group/_id" */).then(m => m.default || m)
const _210b3b69 = () => import('../pages/report/_type/_id.vue' /* webpackChunkName: "pages/report/_type/_id" */).then(m => m.default || m)
const _0cfea1c2 = () => import('../pages/index.vue' /* webpackChunkName: "pages/index" */).then(m => m.default || m)
const _a6aeca04 = () => import('../pages/_flag/index.vue' /* webpackChunkName: "pages/_flag/index" */).then(m => m.default || m)



const scrollBehavior = function(to, from, savedPosition) {
      // return 期望滚动到哪个的位置
      if (savedPosition) {
        return savedPosition
      } else {
        return {
          x: 0,
          y: 0
        }
      }
    }


export function createRouter () {
  return new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,
    routes: [
		{
			path: "/sign/signin",
			component: _b717ebb8,
			name: "sign-signin"
		},
		{
			path: "/feed/:id?",
			component: _ab5504ee,
			name: "feed-id"
		},
		{
			path: "/about/:id?",
			component: _61214e28,
			name: "about-id"
		},
		{
			path: "/group/:id?",
			component: _223c0f1a,
			name: "group-id"
		},
		{
			path: "/report/:type?/:id?",
			component: _210b3b69,
			name: "report-type-id"
		},
		{
			path: "/",
			component: _0cfea1c2,
			name: "index"
		},
		{
			path: "/:flag",
			component: _a6aeca04,
			name: "flag"
		}
    ],
    
    
    fallback: false
  })
}
