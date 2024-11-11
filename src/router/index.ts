import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import HomeLayout from '@/layouts/HomeLayout.vue'
import SettingView from '@/views/SettingView.vue'
import AccountView from '@/views/AccountView.vue'
import HelpView from '@/views/HelpView.vue'
import StatisticView from '@/views/StatisticView.vue'
import LoginLayout from '@/layouts/LoginLayout.vue'
import LoginView from '@/views/Login/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeLayout,
      children: [
        {
          path: '/home',
          component: HomeView
        },
        {
          path: '/setting',
          component: SettingView
        },
        {
          path: '/my-account',
          component: AccountView
        },
        {
          path: '/help',
          component: HelpView
        },
        {
          path: '/statistic',
          component: StatisticView
        }
      ]
    },
    {
      path: '/',
      component: LoginLayout,
      children: [
        {
          path: '/login',
          component: LoginView
        }
      ]
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
