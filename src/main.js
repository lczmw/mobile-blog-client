import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { Toast, Indicator } from 'mint-ui';

import '@/utils/rem'
import '@/permission'

import '@/styles/index.scss'
import 'mint-ui/lib/style.css'

Vue.config.productionTip = false

Vue.prototype.$toast = Toast;
Vue.prototype.$indicator = Indicator;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
