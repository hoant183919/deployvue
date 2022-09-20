import { createRouter, createWebHistory } from 'vue-router'

import Login from '@/components/Login.vue'
import ChangePassword from '@/components/ChangePassword.vue'
import HomeAdmin from '@/components/admin/Home.vue'
import DeviceManagement from '@/components/admin/DeviceManagement.vue'
import HumanManagement from '@/components/admin/HumanManagement.vue'
import Report from '@/components/admin/Report.vue'
import TaskManagementAdmin from '@/components/admin/TaskManagement.vue'
import HomeUser from '@/components/user/Home.vue'
import Device from '@/components/user/Device.vue'
import TaskManagementUser from '@/components/user/TaskManagement.vue'
import Test from '@/components/Test.vue'

const routes = [
    {
        path: '/login',
        component: Login
    },
    {
        path: '/change-password',
        component: ChangePassword
    },
    {
        path: '/admin/home',
        component: TaskManagementAdmin
    },
    {
        path: '/admin/human-management',
        component: TaskManagementAdmin
    },
    {
        path: '/admin/device-management',
        component: TaskManagementAdmin
    },
    {
        path: '/admin/category-device-management',
        component: TaskManagementAdmin
    },
    {
        path: '/admin/report',
        component: TaskManagementAdmin
    },
        {
        path: '/user/home/:id',
        component: TaskManagementUser
    },
        {
        path: '/user/device/:id',
        component: TaskManagementUser
    },
    {
        path: '/test',
        component: Test
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/change-password', '/', '/test']
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('authenticated');

    if(authRequired && !loggedIn){
        next('/login');
    } else {
        next();
    }
})

export default router;