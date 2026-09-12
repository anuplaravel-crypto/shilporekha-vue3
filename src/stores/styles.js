import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  fetchStyles,
  createStyle as apiCreateStyle,
  updateStyle as apiUpdateStyle,
  deleteStyle as apiDeleteStyle,
} from '@/lib/catalog'

export const useStylesStore = defineStore('styles', () => {
  const items = ref([])
  const loading = ref(false)
  const loaded = ref(false)
  const error = ref(null)

  async function fetchAll({ force = false } = {}) {
    if (loaded.value && !force) return
    loading.value = true
    error.value = null
    try {
      items.value = await fetchStyles()
      loaded.value = true
    } catch (e) {
      error.value = e
    } finally {
      loading.value = false
    }
  }

  async function create(payload) {
    const style = await apiCreateStyle(payload)
    items.value = [...items.value, style].sort((a, b) => a.name.localeCompare(b.name))
    return style
  }

  async function update(id, payload) {
    const style = await apiUpdateStyle(id, payload)
    const index = items.value.findIndex((s) => s.id === id)
    if (index !== -1) items.value.splice(index, 1, style)
    return style
  }

  async function remove(id) {
    await apiDeleteStyle(id)
    items.value = items.value.filter((s) => s.id !== id)
  }

  return { items, loading, loaded, error, fetchAll, create, update, remove }
})
