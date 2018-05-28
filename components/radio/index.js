import radio from './dpRadio.vue'
var DpRadio = {
  install: function (Vue) {
    if (typeof window !== 'undefined' && window.Vue) {
      Vue = window.Vue
    }
    Vue.component('DpRadio', radio)
  }
}
export default DpRadio
