import Login from '@/views/Login.vue'
import Err from '@/views/Error.vue'

export default [
    { path: '/login', name: 'login', component: Login },
    { path: '*', name: '404', redirect: '/error/404' },
    { path: '/error/:status', name: 'error', component: Err, props: true }
]