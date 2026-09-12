import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  fetchProducts,
  createProduct as apiCreateProduct,
  updateProduct as apiUpdateProduct,
  deleteProduct as apiDeleteProduct,
} from '@/lib/catalog'

export const useProductsStore = defineStore('products', () => {
  const items = ref([])
  const loading = ref(false)
  const error = ref(null)

  async function fetchAll(filters = {}) {
    loading.value = true
    error.value = null
    try {
      items.value = await fetchProducts(filters)
    } catch (e) {
      error.value = e
    } finally {
      loading.value = false
    }
  }

  async function create(formData) {
    const product = await apiCreateProduct(formData)
    items.value = [...items.value, product]
    return product
  }

  async function update(id, formData) {
    const product = await apiUpdateProduct(id, formData)
    const index = items.value.findIndex((p) => p.id === id)
    if (index !== -1) items.value.splice(index, 1, product)
    return product
  }

  async function remove(id) {
    await apiDeleteProduct(id)
    items.value = items.value.filter((p) => p.id !== id)
  }

  return { items, loading, error, fetchAll, create, update, remove }
})
