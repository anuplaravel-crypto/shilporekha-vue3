<script setup>
import { services, portfolioItems, orders, statusMeta } from '@/admin/data/adminData'

const activeServiceCount = services.filter((s) => s.status === 'active').length
const newThisWeek = orders.filter((o) => o.status === 'new').length
const recentOrders = orders.slice(0, 3)
</script>

<template>
  <h1 class="text-2xl font-semibold">Dashboard</h1>

  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <div class="bg-white border border-gray-200 p-5 flex flex-col gap-1">
      <div class="text-xs uppercase tracking-wide text-ink/40 font-medium">Total Orders</div>
      <div class="text-3xl font-semibold">{{ orders.length }}</div>
    </div>
    <div class="bg-white border border-gray-200 p-5 flex flex-col gap-1">
      <div class="text-xs uppercase tracking-wide text-ink/40 font-medium">New This Week</div>
      <div class="text-3xl font-semibold text-accent">{{ newThisWeek }}</div>
    </div>
    <div class="bg-white border border-gray-200 p-5 flex flex-col gap-1">
      <div class="text-xs uppercase tracking-wide text-ink/40 font-medium">Active Services</div>
      <div class="text-3xl font-semibold">{{ activeServiceCount }} <span class="text-base text-ink/40 font-normal">/ {{ services.length }}</span></div>
    </div>
    <div class="bg-white border border-gray-200 p-5 flex flex-col gap-1">
      <div class="text-xs uppercase tracking-wide text-ink/40 font-medium">Portfolio Items</div>
      <div class="text-3xl font-semibold">{{ portfolioItems.length }}</div>
    </div>
  </div>

  <div class="flex flex-col gap-3">
    <div class="text-xs uppercase tracking-wide text-ink/40 font-medium">Quick Actions</div>
    <div class="flex flex-wrap gap-3">
      <RouterLink :to="{ name: 'admin-portfolio' }" class="border border-ink text-sm font-semibold px-5 py-2.5 hover:bg-ink hover:text-paper transition-colors">+ Add Portfolio Item</RouterLink>
      <RouterLink :to="{ name: 'admin-testimonials' }" class="border border-ink text-sm font-semibold px-5 py-2.5 hover:bg-ink hover:text-paper transition-colors">+ Add Testimonial</RouterLink>
      <RouterLink :to="{ name: 'admin-pricing' }" class="border border-ink text-sm font-semibold px-5 py-2.5 hover:bg-ink hover:text-paper transition-colors">+ New Package</RouterLink>
    </div>
  </div>

  <div class="flex flex-col gap-3">
    <div class="flex items-center justify-between">
      <div class="text-xs uppercase tracking-wide text-ink/40 font-medium">Recent Orders</div>
      <RouterLink :to="{ name: 'admin-orders' }" class="text-xs font-semibold text-ink/60 hover:text-accent">View All →</RouterLink>
    </div>
    <div class="bg-white border border-gray-200 overflow-x-auto">
      <table class="w-full text-sm min-w-[600px]">
        <thead>
          <tr class="text-xs uppercase tracking-wide text-ink/40 font-medium border-b border-gray-200">
            <th class="text-left px-5 py-3 font-medium">Name</th>
            <th class="text-left px-5 py-3 font-medium">Service</th>
            <th class="text-left px-5 py-3 font-medium">Status</th>
            <th class="text-left px-5 py-3 font-medium">Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in recentOrders" :key="order.id" class="card-row border-b border-gray-100 last:border-b-0">
            <td class="px-5 py-3.5"><RouterLink :to="{ name: 'admin-order-detail', params: { id: order.id } }" class="hover:underline">{{ order.name }}</RouterLink></td>
            <td class="px-5 py-3.5 text-ink/60">{{ order.service }}</td>
            <td class="px-5 py-3.5"><span class="text-xs font-semibold px-2.5 py-1" :class="statusMeta[order.status].badgeClass">{{ statusMeta[order.status].label }}</span></td>
            <td class="px-5 py-3.5 text-ink/40">{{ order.date }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
