import NotFound from '@/views/404.vue'
import AppLogin from '@/views/login/index.vue'
import AppHome from '@/views/home/index.vue'

const constantRoutes = [
  {
    path: '/login',
    name: 'AppLogin',
    component: AppLogin,
  },
  {
    path: '/',
    name: 'AppHome',
    component: AppHome,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  },
]

export default constantRoutes
