import Vue from 'vue'
import {
  Indicator,
  Button,
  Field,
  Spinner,
  Toast,
  Lazyload
} from 'mint-ui'
Vue.component(Field.name, Field)
Vue.component(Button.name, Button)
Vue.component(Spinner.name, Spinner)

Vue.use(Lazyload, {
  preLoad: 1.3,
  error: require('~/assets/images/default.jpeg'),
  loading: require('~/assets/images/default.jpeg'),
  attempt: 1,
})

Vue.prototype.$indicator = Indicator
Vue.prototype.$toast = Toast
