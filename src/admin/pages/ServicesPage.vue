<script setup>
import { ref } from 'vue'
import { services } from '@/admin/data/adminData'

const expandedSlug = ref('tshirt-design')

function toggle(slug) {
  expandedSlug.value = expandedSlug.value === slug ? null : slug
}
</script>

<template>
  <div class="flex items-center justify-between">
    <h1 class="text-2xl font-semibold">Services</h1>
    <button class="bg-ink text-paper text-sm font-semibold px-5 py-2.5 hover:bg-accent transition-colors">+ Add Service</button>
  </div>

  <div class="bg-white border border-gray-200 overflow-x-auto">
    <table class="w-full text-sm min-w-[700px]">
      <thead>
        <tr class="text-xs uppercase tracking-wide text-ink/40 font-medium border-b border-gray-200">
          <th class="text-left px-5 py-3 font-medium">Service</th>
          <th class="text-left px-5 py-3 font-medium">Status</th>
          <th class="text-left px-5 py-3 font-medium">Subcategories</th>
          <th class="text-left px-5 py-3 font-medium">Actions</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="service in services" :key="service.slug">
          <tr class="border-b border-gray-100" :class="{ 'opacity-50': service.status !== 'active' }">
            <td class="px-5 py-3.5">
              <button class="flex items-center gap-2 font-medium" @click="toggle(service.slug)">
                <svg
                  width="12" height="12" viewBox="0 0 24 24" fill="none"
                  :stroke="service.status === 'active' ? '#8a8a86' : '#c5c5c1'" stroke-width="2.5"
                  class="transition-transform"
                  :class="{ 'rotate-90': expandedSlug === service.slug }"
                ><polyline points="9 6 15 12 9 18"/></svg>
                {{ service.name }}
              </button>
            </td>
            <td class="px-5 py-3.5">
              <span
                class="text-xs font-semibold px-2.5 py-1"
                :class="service.status === 'active' ? 'border border-ink' : 'bg-gray-100 text-ink/60'"
              >{{ service.status === 'active' ? 'Active' : 'Coming Soon' }}</span>
            </td>
            <td class="px-5 py-3.5 text-ink/50">{{ service.subcategories.length }}</td>
            <td class="px-5 py-3.5"><div class="flex gap-3 text-xs font-semibold"><a href="#" class="hover:underline">Edit</a><a href="#" class="hover:underline text-ink/50">Delete</a></div></td>
          </tr>
          <tr v-if="expandedSlug === service.slug" class="border-b border-gray-100 bg-gray-50/60">
            <td colspan="4" class="px-5 pl-12 py-4">
              <div class="flex flex-wrap gap-2">
                <span v-for="sub in service.subcategories" :key="sub" class="text-xs border border-gray-300 bg-white px-3 py-1.5">{{ sub }}</span>
                <button class="text-xs border border-dashed border-ink px-3 py-1.5 font-medium hover:bg-ink hover:text-paper transition-colors">+ Add Subcategory</button>
              </div>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>

  <p class="text-xs text-ink/40">Click a service name to expand its subcategories. Click the status badge to toggle Active / Coming Soon.</p>
</template>
