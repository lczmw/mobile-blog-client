import {
  LOGIN_OUT,
  LOGIN_IN,
  RECORD_USERINFO,
  RECORD_CUSTOMER_QUERY,
  RECORD_CUSTOMER_GROUP,
  RECORD_NURSING_LOG,
  ADD_BILL_GOODS,
  DELETE_BILL_GOODS,
  UPDATE_BILL_GOODS,
  REMOVE_BILL_GOODS,
  RECORD_BILL_SELECT,
  REMOVE_BILL_SELECT,
  RECORD_EXPIRATION,
  RECORD_OPENID
} from './mutation-types';

export default {
  [LOGIN_IN](state, userInfo) {
    state.isLogin = true;
    state.userInfo = userInfo;
  },
  [RECORD_USERINFO](state, userInfo) {
    state.userInfo = userInfo;
  }
};
