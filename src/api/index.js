import axios from '@/axios';

// 注册
export const register = data =>
  axios({
    url: '/user/register',
    method: 'post',
    data
  });

// 登录
export const login = data =>
  axios({
    url: '/user/login',
    method: 'post',
    data
  });

// auth
export const auth = data =>
  axios({
    url: '/user/auth',
    method: 'post',
    data
  });

// release
export const release = data =>
  axios({
    url: '/article/release',
    method: 'post',
    data
  });

// getAll
export const getAllArticle = data =>
  axios({
    url: '/article/getAll',
    method: 'post',
    data
  });
