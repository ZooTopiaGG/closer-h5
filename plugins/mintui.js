import Vue from 'vue'
import { 
    Indicator,
    Button,
    Field,
    Spinner,
    Toast
} from 'mint-ui'
Vue.component(Field.name, Field)
Vue.component(Button.name, Button)
Vue.component(Spinner.name, Spinner)

Vue.prototype.$indicator = Indicator
Vue.prototype.$toast = Toast
