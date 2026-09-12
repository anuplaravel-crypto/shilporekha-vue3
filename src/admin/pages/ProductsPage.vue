<script setup>
import { ref } from 'vue'
import ProductsTab from '@/admin/components/catalog/ProductsTab.vue'
import CategoriesTab from '@/admin/components/catalog/CategoriesTab.vue'
import StylesTab from '@/admin/components/catalog/StylesTab.vue'

const tabs = [
  { key: 'products', label: 'Products' },
  { key: 'categories', label: 'Categories & Subcategories' },
  { key: 'styles', label: 'Styles' },
]
const activeTab = ref('products')
</script>

<template>
  <h1 class="text-2xl font-semibold">Products</h1>

  <div class="flex gap-1 border-b border-gray-200">
    <button
      v-for="tab in tabs"
      :key="tab.key"
      class="text-sm font-semibold px-4 py-2.5 border-b-2 -mb-px transition-colors"
      :class="
        activeTab === tab.key
          ? 'border-ink text-ink'
          : 'border-transparent text-ink/50 hover:text-ink'
      "
      @click="activeTab = tab.key"
    >
      {{ tab.label }}
    </button>
  </div>

  <ProductsTab v-if="activeTab === 'products'" />
  <CategoriesTab v-else-if="activeTab === 'categories'" />
  <StylesTab v-else-if="activeTab === 'styles'" />
</template>
