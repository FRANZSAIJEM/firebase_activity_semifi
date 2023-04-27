import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Dashboard from '../views/Dashboard.vue'
import Home from '../views/Home.vue'




const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'reg',
      component: Register
    },
    {
      path: '/login',
      name: 'log',
      component: Login
    },
    {
      path: '/dashboard',
      name: 'dash',
      component: Dashboard
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
  
  ]
})

export default router
