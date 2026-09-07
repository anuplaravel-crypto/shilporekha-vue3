import { createRouter, createWebHistory } from 'vue-router'
import FrontendLayout from '@/frontend/layouts/FrontendLayout.vue'
import HomePage from '@/frontend/pages/HomePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: FrontendLayout,
      children: [
        { path: '', name: 'home', component: HomePage },
        { path: 'services', name: 'services', component: () => import('@/frontend/pages/ServicesPage.vue') },
        { path: 'portfolio', name: 'portfolio', component: () => import('@/frontend/pages/PortfolioPage.vue') },
        { path: 'pricing', name: 'pricing', component: () => import('@/frontend/pages/PricingPage.vue') },
        { path: 'contact', name: 'contact', component: () => import('@/frontend/pages/ContactPage.vue') },
      ],
    },
    // /admin routes (AdminLayout + admin pages) join here once the admin
    // panel templating phase starts.
  ],
})

export default router
