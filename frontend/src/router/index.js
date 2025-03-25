import { createRouter, createWebHistory } from 'vue-router';
import Editor from '../components/Editor.vue';
import Login from '../components/Login.vue';
import SignUp from '../components/SignUp.vue';
import { useStore } from 'vuex';

const routes = [
    {
        path: '/',
        name: 'Editor',
        component: Editor,
        meta: { requiresAuth: true }
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/signup',
        name: 'SignUp',
        component: SignUp
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const store = useStore();
    const isLoggedIn = store.getters.isLoggedIn;

    if (to.meta.requiresAuth && !isLoggedIn) {
        next('/login');
    } else if ((to.path === '/login' || to.path === '/signup') && isLoggedIn) {
        next('/');
    } else {
        next();
    }
});

export default router;