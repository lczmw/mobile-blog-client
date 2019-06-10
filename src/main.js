import Vue from 'vue'
import App from './App.vue'
import router from './router'

import '@/utils/rem'

import '@/styles/index.scss'
import 'mint-ui/lib/style.css'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
