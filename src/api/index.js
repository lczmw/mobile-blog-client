import axios from '@/axios'

// 注册
export const register = (data) => axios({
	url: '/user/register',
	method: 'post',
	data,
})