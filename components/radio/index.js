import radio from './dpRadio.vue'
const DpRadio = {
  install: function (Vue) {
    if (typeof window !== 'undefined' && window.Vue) {
      Vue = window.Vue
    }
    Vue.component('DpRadio', radio)
  }
}
export default DpRadio
