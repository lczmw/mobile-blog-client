import router from '@/router'
import { getToken } from '@/utils/token'

const whiteList = ['/login']

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
        if (whiteList.includes(to.path)) {
            next();
        } else {
            next(`/login?redirect=${to.path}`);
        }
    }

})