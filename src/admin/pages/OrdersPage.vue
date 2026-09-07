<script setup>
import { ref, computed } from 'vue'
import { orders, statusMeta } from '@/admin/data/adminData'

const tabs = [
  { value: 'all', label: 'All' },
  { value: 'new', label: 'New' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
]
const activeTab = ref('all')

const filteredOrders = computed(() =>
  activeTab.value === 'all' ? orders : orders.filter((o) => o.status === activeTab.value),
)
</script>

<template>
  <h1 class="text-2xl font-semibold">Orders</h1>

  <div class="flex flex-wrap gap-2 text-xs font-semibold">
    <button
      v-for="tab in tabs"
      :key="tab.value"
      class="px-4 py-2 transition-colors"
      :class="activeTab === tab.value ? 'bg-ink text-paper' : 'border border-gray-200 text-gray-500'"
      @click="activeTab = tab.value"
    >{{ tab.label }}</button>
  </div>

  <div class="bg-white border border-gray-200 overflow-x-auto">
    <table class="w-full text-sm min-w-[760px]">
      <thead>
        <tr class="text-xs uppercase tracking-wide text-ink/40 font-medium border-b border-gray-200">
          <th class="text-left px-5 py-3 font-medium">Name</th>
          <th class="text-left px-5 py-3 font-medium">Email</th>
          <th class="text-left px-5 py-3 font-medium">Service</th>
          <th class="text-left px-5 py-3 font-medium">Budget</th>
          <th class="text-left px-5 py-3 font-medium">Status</th>
          <th class="text-left px-5 py-3 font-medium">Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in filteredOrders" :key="order.id" class="card-row border-b border-gray-100 last:border-b-0">
          <td class="px-5 py-3.5"><RouterLink :to="{ name: 'admin-order-detail', params: { id: order.id } }" class="hover:underline font-medium">{{ order.name }}</RouterLink></td>
          <td class="px-5 py-3.5 text-ink/50">{{ order.email }}</td>
          <td class="px-5 py-3.5 text-ink/60">{{ order.service }}</td>
          <td class="px-5 py-3.5 text-ink/60">{{ order.budget }}</td>
          <td class="px-5 py-3.5"><span class="text-xs font-semibold px-2.5 py-1" :class="statusMeta[order.status].badgeClass">{{ statusMeta[order.status].label }}</span></td>
          <td class="px-5 py-3.5 text-ink/40">{{ order.date }}</td>
        </tr>
      </tbody>
    </table>
  </div>

  <p class="text-xs text-ink/40">Row click opens the order detail. Status here is read-only — change it from the detail screen.</p>
</template>
