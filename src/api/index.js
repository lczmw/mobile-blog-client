import axios from '@/axios'

// 注册
export const register = (data) => axios({
	url: '/user/register',
	method: 'post',
	data,
})

// 登录
export const login = (data) => axios({
	url: '/user/login',
	method: 'post',
	data,
})

// auth
export const auth = (data) => axios({
	url: '/user/auth',
	method: 'post',
	data,
})