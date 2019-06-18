import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import mutations from './mutations'
import actions from './action'

import { isWeiXin, getStore } from '@/utils/util'

Vue.use(Vuex)


const isWeChat = isWeiXin();
const isHeaderShow = !isWeChat;

const state = {
	isWeChat,//是否微信
	isHeaderShow,//是否显示头部
	isMiniProgram: window.__wxjs_environment === 'miniprogram',//是否小程序
	
	isLogin: false,//是否登录
	userInfo: {},//用户信息
	customerQuery: [],//会员查询options
	customerGroup: {},//群组信息
	nursingLog: {},//护理日志订单

	billGoods: getStore('bill_goods', true) || [],//开单商品
	billSelect: getStore('bill_select', true) || {},//开单首页选项

	expiration: {
		gained: false,
		hasExpire: true,//是否期满
		// validThru: '',//有效日期
	},

	openId: '',
}

export default new Vuex.Store({
	state,
	getters,
	mutations,
	actions
})
