import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home';
import SignUpPage from '../views/SignUpPage';
import AlbumsDetailPage from '../views/AlbumsDetailPage';
import AlbumsPage from '../views/AlbumsPage';
import { Auth } from 'aws-amplify';

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: "/signup",
        name: "SignUpPage",
        component: SignUpPage
    },
    {
        path: "/album/:id",
        name: "AlbumsDetailPage",
        component: AlbumsDetailPage,
        meta: { requiresAuth: true }
    },
    {
        path: '/albums',
        name: "AlbumsPage",
        component: AlbumsPage,
        meta: { requiresAuth: true }
    },
    {
        path: '/about',
        name: 'About',
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach(async (to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const isAuthenticated = await Auth.currentUserInfo();

    if (requiresAuth && !isAuthenticated) {
        next("/");
    } else {
        next()
    }
})

export default router