import Vue from 'vue'
import NuxtLoading from './components/nuxt-loading.vue'

import '../assets/css/style.css'

import '../assets/css/common.css'

import '../assets/css/reset.css'


let layouts = {

  "_default": () => import('../layouts/default.vue'  /* webpackChunkName: "layouts/default" */).then(m => m.default || m),

  "_group": () => import('../layouts/group.vue'  /* webpackChunkName: "layouts/group" */).then(m => m.default || m),

  "_signin": () => import('../layouts/signin.vue'  /* webpackChunkName: "layouts/signin" */).then(m => m.default || m)

}

let resolvedLayouts = {}

export default {
  head: {"title":"贴近Closer","meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, initial-scale=1, user-scalable=no"},{"name":"format-detection","content":"telephone=no"},{"hid":"description","name":"description","content":"贴近Closer"}],"link":[{"rel":"icon","type":"image\u002Fx-icon","href":"\u002Ffavicon.ico"},{"rel":"stylesheet","type":"text\u002Fcss","href":"https:\u002F\u002Funpkg.com\u002Fmint-ui\u002Flib\u002Fstyle.css"},{"rel":"stylesheet","type":"text\u002Fcss","href":"\u002F\u002Fat.alicdn.com\u002Ft\u002Ffont_663941_vo6osb9ywm81714i.css"},{"rel":"stylesheet","type":"text\u002Fcss","href":"https:\u002F\u002Fg.alicdn.com\u002Fde\u002Fprismplayer\u002F2.6.0\u002Fskins\u002Fdefault\u002Faliplayer-min.css"}],"script":[{"innerHTML":"(function() {\n            if (typeof window !== 'undefined') {\n                let deviceWidth = document.documentElement.clientWidth\n                if (deviceWidth \u003E 768) deviceWidth = 768\n                document.documentElement.style.fontSize = deviceWidth \u002F 7.5 + \"px\"\n                let nvg = navigator.userAgent.toLowerCase()\n                if (nvg.indexOf('closer-ios') \u003E -1 || nvg.indexOf('closer-android') \u003E -1) {\n                  document.documentElement.style.overflow = \"auto\"\n                } else {\n                  document.documentElement.style.overflow = \"hidden\"\n                }\n            } else {\n                console.log('Do not use window in server')\n            }\n        })();","type":"text\u002Fjavascript","charset":"utf-8"},{"src":"https:\u002F\u002Fg.alicdn.com\u002Fde\u002Fprismplayer\u002F2.6.0\u002Faliplayer-h5-min.js"}],"__dangerouslyDisableSanitizers":["script"],"style":[]},
  render(h, props) {
    const loadingEl = h('nuxt-loading', { ref: 'loading' })
    const layoutEl = h(this.layout || 'nuxt')
    const templateEl = h('div', {
      domProps: {
        id: '__layout'
      },
      key: this.layoutName
    }, [ layoutEl ])

    const transitionEl = h('transition', {
      props: {
        name: 'layout',
        mode: 'out-in'
      }
    }, [ templateEl ])

    return h('div',{
      domProps: {
        id: '__nuxt'
      }
    }, [
      loadingEl,
      transitionEl
    ])
  },
  data: () => ({
    layout: null,
    layoutName: ''
  }),
  beforeCreate () {
    Vue.util.defineReactive(this, 'nuxt', this.$options.nuxt)
  },
  created () {
    // Add this.$nuxt in child instances
    Vue.prototype.$nuxt = this
    // add to window so we can listen when ready
    if (typeof window !== 'undefined') {
      window.$nuxt = this
    }
    // Add $nuxt.error()
    this.error = this.nuxt.error
  },
  
  mounted () {
    this.$loading = this.$refs.loading
  },
  watch: {
    'nuxt.err': 'errorChanged'
  },
  
  methods: {
    
    errorChanged () {
      if (this.nuxt.err && this.$loading) {
        if (this.$loading.fail) this.$loading.fail()
        if (this.$loading.finish) this.$loading.finish()
      }
    },
    
    setLayout (layout) {
      if (!layout || !resolvedLayouts['_' + layout]) layout = 'default'
      this.layoutName = layout
      let _layout = '_' + layout
      this.layout = resolvedLayouts[_layout]
      return this.layout
    },
    loadLayout (layout) {
      if (!layout || !(layouts['_' + layout] || resolvedLayouts['_' + layout])) layout = 'default'
      let _layout = '_' + layout
      if (resolvedLayouts[_layout]) {
        return Promise.resolve(resolvedLayouts[_layout])
      }
      return layouts[_layout]()
      .then((Component) => {
        resolvedLayouts[_layout] = Component
        delete layouts[_layout]
        return resolvedLayouts[_layout]
      })
      .catch((e) => {
        if (this.$nuxt) {
          return this.$nuxt.error({ statusCode: 500, message: e.message })
        }
      })
    }
  },
  components: {
    NuxtLoading
  }
}

