<script setup>
import { ref, computed } from 'vue'
import { portfolioItems, portfolioFilters } from '@/frontend/data/placeholderData'
import CtaBand from '@/frontend/components/layout/CtaBand.vue'

const activeFilter = ref('all')

const filteredItems = computed(() =>
  activeFilter.value === 'all'
    ? portfolioItems
    : portfolioItems.filter((item) => item.category === activeFilter.value),
)
</script>

<template>
  <section class="max-w-6xl mx-auto px-6 pt-16 pb-10">
    <h1 class="font-display text-5xl text-offset mb-4">Portfolio</h1>
    <p class="text-ink/70 max-w-xl mb-8">A selection of t-shirt graphics — streetwear drops, band merch, and type-driven designs.</p>
    <div class="flex flex-wrap gap-3 text-xs uppercase tracking-wide font-semibold">
      <button
        v-for="filter in portfolioFilters"
        :key="filter.value"
        class="px-4 py-2 transition-colors"
        :class="activeFilter === filter.value ? 'bg-ink text-paper' : 'border border-ink/20 hover:border-ink'"
        @click="activeFilter = filter.value"
      >
        {{ filter.label }}
      </button>
    </div>
  </section>

  <section class="max-w-6xl mx-auto px-6 py-10 border-t border-ink/10">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="item in filteredItems" :key="item.id" class="card-hover border border-ink">
        <img :src="item.image" :alt="item.title" class="w-full aspect-square object-cover">
        <div class="p-4">
          <div class="text-sm font-semibold">{{ item.title }}</div>
          <div class="text-xs text-ink/50 uppercase tracking-wide">{{ item.categoryLabel }}</div>
        </div>
      </div>
    </div>
  </section>

  <CtaBand heading="Like what you see? Let's design yours." />
</template>
