import { createRouter, createWebHistory } from 'vue-router'
import FrontendLayout from '@/frontend/layouts/FrontendLayout.vue'
import HomePage from '@/frontend/pages/HomePage.vue'
import AdminLayout from '@/admin/layouts/AdminLayout.vue'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: FrontendLayout,
      children: [
        { path: '', name: 'home', component: HomePage },
        {
          path: 'services',
          name: 'services',
          component: () => import('@/frontend/pages/ServicesPage.vue'),
        },
        {
          path: 'portfolio',
          name: 'portfolio',
          component: () => import('@/frontend/pages/PortfolioPage.vue'),
        },
        {
          path: 'pricing',
          name: 'pricing',
          component: () => import('@/frontend/pages/PricingPage.vue'),
        },
        {
          path: 'contact',
          name: 'contact',
          component: () => import('@/frontend/pages/ContactPage.vue'),
        },
      ],
    },
    {
      path: '/admin/login',
      name: 'admin-login',
      component: () => import('@/admin/pages/LoginPage.vue'),
      meta: { title: 'Log In' },
    },
    {
      path: '/admin',
      component: AdminLayout,
      meta: { requiresAuth: true },
      children: [
        { path: '', redirect: { name: 'admin-dashboard' } },
        {
          path: 'dashboard',
          name: 'admin-dashboard',
          component: () => import('@/admin/pages/DashboardPage.vue'),
          meta: { title: 'Dashboard' },
        },
        {
          path: 'services',
          name: 'admin-services',
          component: () => import('@/admin/pages/ServicesPage.vue'),
          meta: { title: 'Services' },
        },
        {
          path: 'portfolio',
          name: 'admin-portfolio',
          component: () => import('@/admin/pages/PortfolioPage.vue'),
          meta: { title: 'Portfolio' },
        },
        {
          path: 'pricing',
          name: 'admin-pricing',
          component: () => import('@/admin/pages/PricingPage.vue'),
          meta: { title: 'Pricing' },
        },
        {
          path: 'orders',
          name: 'admin-orders',
          component: () => import('@/admin/pages/OrdersPage.vue'),
          meta: { title: 'Orders' },
        },
        {
          path: 'orders/:id',
          name: 'admin-order-detail',
          component: () => import('@/admin/pages/OrderDetailPage.vue'),
          meta: { title: 'Order Detail' },
        },
        {
          path: 'testimonials',
          name: 'admin-testimonials',
          component: () => import('@/admin/pages/TestimonialsPage.vue'),
          meta: { title: 'Testimonials' },
        },
        {
          path: 'settings',
          name: 'admin-settings',
          component: () => import('@/admin/pages/SettingsPage.vue'),
          meta: { title: 'Settings' },
        },
      ],
    },
  ],
})

router.beforeEach(async (to) => {
  if (!to.matched.some((record) => record.meta.requiresAuth)) return true

  const auth = useAuthStore()
  if (!auth.checked) await auth.fetchMe()

  if (!auth.user) {
    return { name: 'admin-login', query: { redirect: to.fullPath } }
  }

  return true
})

export default router
