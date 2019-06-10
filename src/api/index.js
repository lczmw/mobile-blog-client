import axios from '@/axios'

// 获取门店信息接口
export const MyStores = () => axios({
	url: '/CRMAPI/Account/MyStores',
	method: 'post',
})