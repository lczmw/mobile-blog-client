import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
    base: process.env.BASE_URL,
    routes: [{
            path: '',
            redirect: '/register'
        },
        {
            path: '/register',
            name: 'register',
            meta: { title: '注册' },
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import( /* webpackChunkName: "about" */ './views/register/index.vue')
        },
        {
            path: '/login',
            name: 'login',
            meta: { title: '登录' },
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import( /* webpackChunkName: "about" */ './views/login/index.vue')
        }
    ]
})


export default router