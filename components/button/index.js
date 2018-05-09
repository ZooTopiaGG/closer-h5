import button from './dpButton.vue'
const DpButton = {
  install: function (Vue) {
    if (typeof window !== 'undefined' && window.Vue) {
      Vue = window.Vue
    }
    Vue.component('DpButton', button)
  }
}
export default DpButton