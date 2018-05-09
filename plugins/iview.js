import Vue from 'vue'
// import iView from 'iview'
import {
    Icon,
    Button,
    Message,
    LoadingBar
} from 'iview'
import DpButton from '~/components/button'
import DpRadio from '~/components/radio'
import '~/assets/css/theme.less'
Vue.component('Icon', Icon);
Vue.component('Button', Button);
Vue.use(DpRadio)
Vue.use(DpButton)

Vue.prototype.$loadingbar = LoadingBar;
Vue.prototype.$message = Message;
// Vue.prototype.$com = Coms;
