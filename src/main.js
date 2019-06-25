import Vue from 'vue';
import App from './App.vue';
import router from './router';
// import store from './store'
import { Toast, Indicator } from 'mint-ui';
import io from 'socket.io-client';

import '@/utils/rem';
import '@/permission';

import '@/assets/iconfont/iconfont.css';
import '@/styles/index.scss';
import 'mint-ui/lib/style.css';

Vue.config.productionTip = false;

Vue.prototype.$toast = Toast;
Vue.prototype.$indicator = Indicator;

//注册全局组件
const requireComponent = require.context('@/components', true, /\index.vue$/);
requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName);
  const componentName = fileName.replace(/^\.\//, '').replace(/\/index\.vue/, '');
  Vue.component(componentName, componentConfig.default || componentConfig);
});

// let socket = io('//localhost:3000');
// socket.on('sign out', () => {
//   console.log('sign out');
// });

new Vue({
  router,
  // store,
  render: h => h(App)
}).$mount('#app');
