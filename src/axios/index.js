import axios from "axios";
import Vue from "vue";

let instance = axios.create({
  baseURL: "http://local.dev.pospal.cn:3000/blog",
  timeout: 10000,
  withCredentials: true
});

// // request拦截器

instance.interceptors.request.use(
  config => {
    Vue.prototype.$indicator.open();

    return config;
  },
  error => {
    // Do something with request error
    // console.log(error) // for debug
    return Promise.reject(error);
  }
);

// // respone拦截器
instance.interceptors.response.use(
  response => {
    Vue.prototype.$indicator.close();

    const res = response.data;

    if (response.status !== 200) {
      return Promise.reject("error");
    } else {
      if (response.config.method === "post") {
        res.message &&
          Vue.prototype.$toast({
            message: res.message,
            duration: 2000
          });
        if (res.code === 200) {
          return res;
        } else {
          return Promise.reject(res);
        }
      } else {
        return res;
      }
    }
  },
  error => {
    Vue.prototype.$indicator.close();
    Vue.prototype.$toast({
      message: error,
      duration: 3000
    });
    // console.log('err' + error)// for debug
    return Promise.reject(error);
  }
);

export default instance;
