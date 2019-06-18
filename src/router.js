import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
    base: process.env.BASE_URL,
    routes: [{
        path: '',
        redirect: '/article'
    },
    {
        path: '/register',
        name: 'register',
        meta: { title: '注册' },
        component: () => import('./views/register/index.vue')
    },
    {
        path: '/login',
        name: 'login',
        meta: { title: '登录' },
        component: () => import('./views/login/index.vue')
    },
    {
        path: '/article',
        name: 'article',
        meta: { title: '全部文章' },
        component: () => import('./views/article/list.vue')
    },
    {
        path: '/release',
        name: 'release',
        meta: { title: '发文章' },
        component: () => import('./views/article/release.vue')
    }
    ]
})


export default router