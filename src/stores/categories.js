import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  fetchCategories,
  createCategory as apiCreateCategory,
  updateCategory as apiUpdateCategory,
  deleteCategory as apiDeleteCategory,
  createSubcategory as apiCreateSubcategory,
  updateSubcategory as apiUpdateSubcategory,
  deleteSubcategory as apiDeleteSubcategory,
} from '@/lib/catalog'

// Categories come back from the API with their subcategories already
// nested (CategoryResource eager-loads them), so this one store manages
// both levels together instead of splitting into two stores that would
// just have to stay in sync with each other.
export const useCategoriesStore = defineStore('categories', () => {
  const items = ref([])
  const loading = ref(false)
  const error = ref(null)
  const loadedServiceId = ref(null)

  async function fetchAll(serviceId, { force = false } = {}) {
    if (!force && loadedServiceId.value === serviceId && items.value.length) return
    loading.value = true
    error.value = null
    try {
      items.value = await fetchCategories(serviceId)
      loadedServiceId.value = serviceId
    } catch (e) {
      error.value = e
    } finally {
      loading.value = false
    }
  }

  function findCategory(categoryId) {
    return items.value.find((c) => c.id === categoryId)
  }

  async function createCategory(payload) {
    const category = await apiCreateCategory(payload)
    items.value = [...items.value, category].sort((a, b) => a.sort_order - b.sort_order)
    return category
  }

  async function updateCategory(id, payload) {
    const category = await apiUpdateCategory(id, payload)
    const index = items.value.findIndex((c) => c.id === id)
    if (index !== -1) items.value.splice(index, 1, category)
    return category
  }

  async function deleteCategory(id) {
    await apiDeleteCategory(id)
    items.value = items.value.filter((c) => c.id !== id)
  }

  async function createSubcategory(categoryId, payload) {
    const subcategory = await apiCreateSubcategory({ ...payload, category_id: categoryId })
    const category = findCategory(categoryId)
    if (category) {
      category.subcategories = [...category.subcategories, subcategory].sort(
        (a, b) => a.sort_order - b.sort_order,
      )
    }
    return subcategory
  }

  async function updateSubcategory(subcategoryId, payload) {
    const subcategory = await apiUpdateSubcategory(subcategoryId, payload)
    for (const category of items.value) {
      const index = category.subcategories.findIndex((s) => s.id === subcategoryId)
      if (index !== -1) {
        category.subcategories.splice(index, 1, subcategory)
        break
      }
    }
    return subcategory
  }

  async function deleteSubcategory(subcategoryId) {
    await apiDeleteSubcategory(subcategoryId)
    for (const category of items.value) {
      category.subcategories = category.subcategories.filter((s) => s.id !== subcategoryId)
    }
  }

  return {
    items,
    loading,
    error,
    fetchAll,
    createCategory,
    updateCategory,
    deleteCategory,
    createSubcategory,
    updateSubcategory,
    deleteSubcategory,
  }
})
