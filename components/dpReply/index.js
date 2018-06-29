import dpreply from './dpReply.vue'
var DpReply = {
  install: function (Vue) {
    if (typeof window !== 'undefined' && window.Vue) {
      Vue = window.Vue
    }
    Vue.component('DpReply', dpreply)
  }
}
export default DpReply
