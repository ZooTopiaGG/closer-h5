import dplogin from './dpLogin.vue'
var DpLogin = {
  install: function (Vue) {
    if (typeof window !== 'undefined' && window.Vue) {
      Vue = window.Vue
    }
    Vue.component('DpLogin', dplogin)
  }
}
export default DpLogin
