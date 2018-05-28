import button from './dpButton.vue'
var DpButton = {
  install: function (Vue) {
    if (typeof window !== 'undefined' && window.Vue) {
      Vue = window.Vue
    }
    Vue.component('DpButton', button)
  }
}
export default DpButton
