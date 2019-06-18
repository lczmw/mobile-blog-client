import router from '@/router'
import { auth } from '@/api'
import { getToken } from '@/utils/token'

router.beforeEach((to, from, next) => {

    document.title = to.meta.title || '';
   
    const hasToken = getToken();

    if (hasToken) {
        if (to.path === '/login') {
            next({ path: '/' })
        } else {
            next()
        }
    } else {
        next(`/login?redirect=${to.path}`)
    }
    next()
})