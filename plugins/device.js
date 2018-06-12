import Vue from 'vue'
import FastClick from 'fastclick'
// import '~/assets/js/pxrem.js'
var deviceWidth = document.documentElement.clientWidth
Vue.prototype.$deviceWidth = deviceWidth

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
    FastClick.attach(document.body);
  }, false);
}
