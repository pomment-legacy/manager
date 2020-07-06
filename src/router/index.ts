import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import store from '@/store';
// import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'Home',
        redirect: () => {
            if (!store.state.logged) {
                return '/login';
            }
            return '/list/threads';
        },
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
    },
    {
        path: '/list',
        name: 'List',
        component: () => import(/* webpackChunkName: "list" */ '../views/List.vue'),
        children: [
            {
                path: 'threads',
                name: 'Threads',
                component: () => import(/* webpackChunkName: "threads" */ '../views/List/Threads.vue'),
            },
            {
                path: 'posts/:threadURL',
                name: 'Posts',
                component: () => import(/* webpackChunkName: "posts" */ '../views/List/Posts.vue'),
            },
        ],
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.name !== 'Login' && !store.state.logged) {
        store.commit('setNextPath', {
            nextPath: to.path,
        });
        next({ name: 'Login' });
        return;
    }
    next();
});

export default router;
