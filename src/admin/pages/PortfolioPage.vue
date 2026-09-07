<script setup>
import { ref, computed } from 'vue'
import { portfolioItems, portfolioSubcategoryFilters } from '@/admin/data/adminData'

const activeFilter = ref('all')
const search = ref('')
// Local reactive copy so the featured toggle can update the UI (swapped
// for a real PATCH call once the API phase starts).
const items = ref(portfolioItems.map((item) => ({ ...item })))

const filteredItems = computed(() =>
  items.value.filter((item) => {
    const matchesFilter = activeFilter.value === 'all' || item.subcategory === activeFilter.value
    const matchesSearch = item.title.toLowerCase().includes(search.value.toLowerCase())
    return matchesFilter && matchesSearch
  }),
)

function toggleFeatured(item) {
  item.featured = !item.featured
}
</script>

<template>
  <div class="flex items-center justify-between flex-wrap gap-4">
    <h1 class="text-2xl font-semibold">Portfolio</h1>
    <button class="bg-ink text-paper text-sm font-semibold px-5 py-2.5 hover:bg-accent transition-colors">+ Add Portfolio Item</button>
  </div>

  <div class="flex flex-wrap gap-3 items-center">
    <select v-model="activeFilter" class="border border-gray-300 text-sm px-3 py-2 bg-white focus:outline-none focus:border-ink">
      <option v-for="filter in portfolioSubcategoryFilters" :key="filter.value" :value="filter.value">{{ filter.label }}</option>
    </select>
    <input v-model="search" type="text" placeholder="Search title..." class="border border-gray-300 text-sm px-3 py-2 bg-white focus:outline-none focus:border-ink flex-1 max-w-xs">
  </div>

  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
    <div v-for="item in filteredItems" :key="item.id" class="bg-white border border-gray-200">
      <div class="relative h-40 bg-gray-100">
        <img :src="item.image" :alt="item.title" class="w-full h-full object-cover">
        <button :class="item.featured ? 'text-ink' : 'text-gray-300'" class="absolute top-2 right-2" @click="toggleFeatured(item)">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7-6.2-3.8-6.2 3.8 1.6-7L2 9.2l7.1-.6z"/></svg>
        </button>
      </div>
      <div class="p-3 flex flex-col gap-0.5">
        <div class="text-sm font-semibold">{{ item.title }}</div>
        <div class="text-xs text-ink/50 uppercase tracking-wide">{{ item.subcategoryLabel }}</div>
      </div>
    </div>
  </div>

  <p class="text-xs text-ink/40">The star toggles "featured" (shows on the homepage). Click a card to open its edit form.</p>
</template>
