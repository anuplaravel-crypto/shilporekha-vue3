<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { orders, statusMeta } from '@/admin/data/adminData'

const route = useRoute()
const order = computed(() => orders.find((o) => o.id === Number(route.params.id)) ?? orders[0])

const status = ref(order.value.status)
const dropdownOpen = ref(false)
const notes = ref('')

function selectStatus(value) {
  status.value = value
  dropdownOpen.value = false
}

const statusOptions = ['new', 'in_progress', 'completed', 'cancelled']
</script>

<template>
  <RouterLink :to="{ name: 'admin-orders' }" class="flex items-center gap-2 text-xs font-semibold text-ink/60 hover:text-ink w-fit">
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
    Back to Orders
  </RouterLink>
  <h1 class="text-2xl font-semibold">{{ order.name }} — Order #{{ order.id }}</h1>

  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

    <div class="lg:col-span-2 flex flex-col gap-5">
      <div class="bg-white border border-gray-200 p-6 flex flex-col gap-5">
        <div class="grid grid-cols-2 gap-4 text-sm">
          <div><div class="text-xs uppercase tracking-wide text-ink/40 font-medium mb-0.5">Name</div>{{ order.name }}</div>
          <div><div class="text-xs uppercase tracking-wide text-ink/40 font-medium mb-0.5">Email</div>{{ order.email }}</div>
          <div><div class="text-xs uppercase tracking-wide text-ink/40 font-medium mb-0.5">Service</div>{{ order.service }}</div>
          <div><div class="text-xs uppercase tracking-wide text-ink/40 font-medium mb-0.5">Budget</div>{{ order.budget }}</div>
          <div><div class="text-xs uppercase tracking-wide text-ink/40 font-medium mb-0.5">Timeline</div>{{ order.timeline }}</div>
          <div><div class="text-xs uppercase tracking-wide text-ink/40 font-medium mb-0.5">Submitted</div>{{ order.submitted }}</div>
        </div>
        <div>
          <div class="text-xs uppercase tracking-wide text-ink/40 font-medium mb-1.5">Description</div>
          <p class="text-sm text-ink/70 leading-relaxed">{{ order.description }}</p>
        </div>
      </div>

      <div class="flex flex-col gap-2">
        <div class="text-xs uppercase tracking-wide text-ink/40 font-medium">Style Reference Attachments</div>
        <div v-if="order.attachments.length" class="flex flex-wrap gap-2.5">
          <a v-for="file in order.attachments" :key="file.name" href="#" class="flex items-center gap-2 border border-gray-300 bg-white px-3 py-2 text-xs hover:border-ink transition-colors">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"/></svg>
            {{ file.name }}
          </a>
        </div>
        <p v-else class="text-xs text-ink/40">No files attached to this brief.</p>
      </div>
    </div>

    <div class="flex flex-col gap-4">
      <div class="bg-white border border-gray-200 p-5 flex flex-col gap-2 relative">
        <div class="text-xs uppercase tracking-wide text-ink/40 font-medium">Status</div>
        <button class="border border-gray-300 px-3 py-2.5 text-sm flex items-center justify-between hover:border-ink transition-colors" @click="dropdownOpen = !dropdownOpen">
          <span class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full" :class="statusMeta[status].dotClass"></span>{{ statusMeta[status].label }}</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div v-if="dropdownOpen" class="absolute top-full left-5 right-5 mt-1 bg-white border border-gray-200 shadow-lg z-10 text-sm">
          <button
            v-for="opt in statusOptions"
            :key="opt"
            class="w-full text-left px-3 py-2.5 hover:bg-gray-50 flex items-center gap-2"
            @click="selectStatus(opt)"
          ><span class="w-1.5 h-1.5 rounded-full" :class="statusMeta[opt].dotClass"></span>{{ statusMeta[opt].label }}</button>
        </div>
        <p class="text-xs text-ink/40">Updates the order status via the API.</p>
      </div>
      <div class="bg-white border border-gray-200 p-5 flex flex-col gap-2">
        <div class="text-xs uppercase tracking-wide text-ink/40 font-medium">Internal Notes</div>
        <textarea v-model="notes" rows="4" class="border border-gray-300 p-2.5 text-sm focus:outline-none focus:border-ink" placeholder="Not visible to the client..."></textarea>
      </div>
      <button class="bg-ink text-paper text-sm font-semibold py-3 hover:bg-accent transition-colors">Save Changes</button>
    </div>

  </div>
</template>
