import Vue from 'vue'
Vue.use(VueLazyload, {  
  preLoad: 1.3,
  error: require('~/assets/images/default.jpeg'),
  loading: require('~/assets/images/default.jpeg'),
  attempt: 1,
  // the default is ['scroll', 'wheel', 'mousewheel', 'resize', 'animationend', 'transitionend']
  listenEvents: [ 'scroll' ]
})
