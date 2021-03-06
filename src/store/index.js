import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import mutations from './mutations';
import actions from './action';

Vue.use(Vuex);

const state = {
  isLogin: false, //是否登录
  userInfo: {} //用户信息
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});
