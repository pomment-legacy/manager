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
            return '/dashboard';
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
        component: () => import(/* webpackChunkName: "dashboard" */ '../views/List.vue'),
        children: [
            {
                path: 'threads',
                name: 'Threads',
                component: () => import(/* webpackChunkName: "threads" */ '../views/List/Threads.vue'),
            },
        ],
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
