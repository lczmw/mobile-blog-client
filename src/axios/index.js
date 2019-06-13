import axios from 'axios'
import Vue from 'vue'


let instance = axios.create({
	baseURL: '/api',
	timeout: 10000,
  withCredentials: false,
})

// // request拦截器

instance.interceptors.request.use(config => {

  Vue.prototype.$indicator.open();

  return config
}, error => {
  // Do something with request error
  // console.log(error) // for debug
  return Promise.reject(error)
})

// // respone拦截器
instance.interceptors.response.use(
  response => {

    Vue.prototype.$indicator.close();

    const res = response.data

    if (response.status !== 200) {
      return Promise.reject('error')
    } else {
   
      if (response.config.method === 'post'){
          response.data.message && Vue.prototype.$toast({
            message: response.data.message,
            duration: 2000
          })
          if (response.data.code === 200) {
            return response.data;
          } else {           
             return Promise.reject(response.data);
          }
      } else {
        return response.data;
      }
     
      
    }
  },
  error => {

    Vue.prototype.$indicator.close();
    Vue.prototype.$toast({
      message: error,
      duration: 3000
    })
    // console.log('err' + error)// for debug
    return Promise.reject(error)
  }
)


export default instance;