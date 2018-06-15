import dpfeed from './feed.vue'
var DpFeed = {
  install: function (Vue) {
    if (typeof window !== 'undefined' && window.Vue) {
      Vue = window.Vue
    }
    Vue.component('DpFeed', dpfeed)
  }
}
export default DpFeed
