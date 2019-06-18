import { 
	RECORD_USERINFO, 
	ADD_BILL_GOODS, 
	DELETE_BILL_GOODS, 
	UPDATE_BILL_GOODS,
	REMOVE_BILL_GOODS,
	RECORD_BILL_SELECT,
	REMOVE_BILL_SELECT,
	RECORD_EXPIRATION,
} from './mutation-types'

export default {
	async getUserInfo({ commit }) {

		let r = window.location.search.substr(1);
		let { accountName, customerTel } = querystring.parse(r)
		let res;
		if (typeof accountName !== 'undefined' && typeof customerTel !== 'undefined') {
			await SignInByPhoneAndAccountName({
				accountName,
				customerTel
			});
		
		}

		res = await FindLoginInfo();
		commit(RECORD_USERINFO, res);
		return new Promise((resolve, reject) => {
			if (res.status === 'success') {
				resolve(res);
			}else {
				reject();
			}
		})
	},

	isOnLine({ commit, state, dispatch }) {
		
		return new Promise((resolve, reject) => {
			if (state.isLogin) {
				resolve();
				return
			}
			dispatch('getUserInfo')
			.then(() => {
			
				resolve();
			})
			.catch(() => {
				
				reject();
			})
		})	
	},

	recordExpiration({ commit }, data) {
		commit(RECORD_EXPIRATION, { ...data, gained: true })
	},
	isBillGoodsExist({ commit, state }, goods) {
		return new Promise((resolve, reject) => {
		  	for (const [i, v] of state.billGoods.entries()) {
		        if (v.txtUid === goods.txtUid) {
		          resolve(v);	
		          return;
		        }
	      	}
	      	reject();
		})
	},
	addBillGoods({ commit, state }, goods) {
	  commit(ADD_BILL_GOODS, goods)
    },
    deleteBillGoods({ commit }, goods) {
      commit(DELETE_BILL_GOODS, goods)
    },
    updateBillGoods({ commit }, goods) {
      commit(UPDATE_BILL_GOODS, goods)
    },
    removeBillGoods({ commit }) {
      commit(REMOVE_BILL_GOODS)
    },
    recordBillSelect({ commit }, data) {
      commit(RECORD_BILL_SELECT, data)
    },
    removeBillSelect({ commit }) {
      commit(REMOVE_BILL_SELECT)
    },
}