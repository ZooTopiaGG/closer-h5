import Vue from 'vue'
// import iView from 'iview'
import {
    RadioGroup,
    Radio,
    Icon,
    Button,
    Message,
    LoadingBar
} from 'iview'
import '~/assets/css/theme.less'
Vue.component('Radio', Radio);
Vue.component('RadioGroup', RadioGroup);
Vue.component('Icon', Icon);
Vue.component('Button', Button);

Vue.prototype.$loadingbar = LoadingBar;
Vue.prototype.$message = Message;
// Vue.prototype.$com = Coms;
