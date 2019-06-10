import axios from 'axios'
import Vue from 'vue'

let instance = axios.create({
	baseURL: '/',
	timeout: 60000,
  withCredentials: false,
})

// // request拦截器

instance.interceptors.request.use(config => {
 
  return config
}, error => {
  // Do something with request error
  // console.log(error) // for debug
  return Promise.reject(error)
})

// // respone拦截器
instance.interceptors.response.use(
  response => {
 
    const res = response.data

    if (response.status !== 200) {
      return Promise.reject('error')
    } else {
   
      if (response.config.method === 'post'){
          if (response.data.successed) {
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
    // console.log('err' + error)// for debug
    return Promise.reject(error)
  }
)


export default instance;