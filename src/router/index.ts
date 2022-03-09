import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: () => import( '../views/Home.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import( '../views/LoginRegister.vue')
    }, {
        path: '/menu',
        name: 'Menu',
        component: () => import( '../views/Menu.vue'),
        children: [
            {
                // 当 /user/:id/profile 匹配成功，
                // UserProfile 会被渲染在 User 的 <router-view> 中
                path: 'newNote',
                component: () => import( '../components/NewNote.vue')
            },
            {
                // 当 /user/:id/profile 匹配成功，
                // UserProfile 会被渲染在 User 的 <router-view> 中
                path: 'myNotes',
                component: () => import( '../components/MyNotes.vue')
            },
            {
                // 当 /user/:id/profile 匹配成功，
                // UserProfile 会被渲染在 User 的 <router-view> 中
                path: 'BrowseNotes',
                component: () => import( '../components/BrowseNotes.vue')
            }
        ]
    }, {
        path: '/:catchAll(.*)',
        name: '404',
        component: () => import( '../views/404.vue')
    }


]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
