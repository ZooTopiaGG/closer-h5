import dptextarea from './dpTextArea.vue'
const DpTextArea = {
  install: function (Vue) {
    if (typeof window !== 'undefined' && window.Vue) {
      Vue = window.Vue
    }
    Vue.component('DpTextArea', dptextarea)
  }
}
export default DpTextArea
