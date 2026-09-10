import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  fetchServices,
  createService as apiCreateService,
  updateService as apiUpdateService,
  deleteService as apiDeleteService,
} from '@/lib/services'

// Single shared source of the service catalog — both the public site
// (read-only) and the admin panel (full CRUD) pull from this store instead
// of each fetching/duplicating the list independently.
export const useServicesStore = defineStore('services', () => {
  const items = ref([])
  const loading = ref(false)
  const loaded = ref(false)
  const error = ref(null)

  async function fetchAll({ force = false } = {}) {
    if (loaded.value && !force) return
    loading.value = true
    error.value = null
    try {
      items.value = await fetchServices()
      loaded.value = true
    } catch (e) {
      error.value = e
    } finally {
      loading.value = false
    }
  }

  async function create(payload) {
    const service = await apiCreateService(payload)
    items.value = [...items.value, service].sort((a, b) => a.sort_order - b.sort_order)
    return service
  }

  async function update(id, payload) {
    const service = await apiUpdateService(id, payload)
    const index = items.value.findIndex((s) => s.id === id)
    if (index !== -1) items.value.splice(index, 1, service)
    return service
  }

  async function remove(id) {
    await apiDeleteService(id)
    items.value = items.value.filter((s) => s.id !== id)
  }

  return { items, loading, loaded, error, fetchAll, create, update, remove }
})
