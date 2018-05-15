import dplogin from './dpLogin.vue'
const DpLogin = {
  install: function (Vue) {
    if (typeof window !== 'undefined' && window.Vue) {
      Vue = window.Vue
    }
    Vue.component('DpLogin', dplogin)
  }
}
export default DpLogin
