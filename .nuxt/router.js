import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _5f2e39d4 = () => import('../pages/report/index.vue' /* webpackChunkName: "pages/report/index" */).then(m => m.default || m)
const _ea3c21b0 = () => import('../pages/feed/_id.vue' /* webpackChunkName: "pages/feed/_id" */).then(m => m.default || m)
const _d43e9a04 = () => import('../pages/report/_id.vue' /* webpackChunkName: "pages/report/_id" */).then(m => m.default || m)
const _0c14a6fa = () => import('../pages/index.vue' /* webpackChunkName: "pages/index" */).then(m => m.default || m)
const _b77a5e02 = () => import('../pages/_flag/index.vue' /* webpackChunkName: "pages/_flag/index" */).then(m => m.default || m)



const scrollBehavior = function(to, from, savedPosition) {
      // return 期望滚动到哪个的位置
      if(savedPosition){
        return savedPosition
      }else{
        return { x:0,y:0 }
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
			path: "/report",
			component: _5f2e39d4,
			name: "report"
		},
		{
			path: "/feed/:id?",
			component: _ea3c21b0,
			name: "feed-id"
		},
		{
			path: "/report/:id",
			component: _d43e9a04,
			name: "report-id"
		},
		{
			path: "/",
			component: _0c14a6fa,
			name: "index"
		},
		{
			path: "/:flag",
			component: _b77a5e02,
			name: "flag"
		}
    ],
    
    
    fallback: false
  })
}
