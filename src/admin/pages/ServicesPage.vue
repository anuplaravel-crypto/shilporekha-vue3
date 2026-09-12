<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useServicesStore } from '@/stores/services'

const store = useServicesStore()

const expandedId = ref(null)

function toggle(id) {
  expandedId.value = expandedId.value === id ? null : id
}

const showModal = ref(false)
const editingService = ref(null)
const saving = ref(false)
const formErrors = ref({})
const form = reactive({ name: '', description: '', icon: '', status: 'active', sort_order: 0 })

function resetForm() {
  form.name = ''
  form.description = ''
  form.icon = ''
  form.status = 'active'
  form.sort_order = store.items.length
  formErrors.value = {}
}

function openCreateModal() {
  editingService.value = null
  resetForm()
  showModal.value = true
}

function openEditModal(service) {
  editingService.value = service
  form.name = service.name
  form.description = service.description ?? ''
  form.icon = service.icon ?? ''
  form.status = service.status
  form.sort_order = service.sort_order
  formErrors.value = {}
  showModal.value = true
}

async function submitForm() {
  saving.value = true
  formErrors.value = {}
  try {
    if (editingService.value) {
      await store.update(editingService.value.id, { ...form })
    } else {
      await store.create({ ...form })
    }
    showModal.value = false
  } catch (error) {
    formErrors.value = error.response?.data?.errors ?? {}
  } finally {
    saving.value = false
  }
}

async function toggleStatus(service) {
  await store.update(service.id, { status: service.status === 'active' ? 'coming_soon' : 'active' })
}

async function onDelete(service) {
  if (!confirm(`Delete "${service.name}"? This cannot be undone.`)) return
  await store.remove(service.id)
}

onMounted(() => store.fetchAll())
</script>

<template>
  <div class="flex items-center justify-between">
    <h1 class="text-2xl font-semibold">Services</h1>
    <button
      class="bg-ink text-paper text-sm font-semibold px-5 py-2.5 hover:bg-accent transition-colors"
      @click="openCreateModal"
    >
      + Add Service
    </button>
  </div>

  <p v-if="store.error" class="text-sm text-red-600">
    Couldn't load services. Please refresh the page.
  </p>
  <p v-else-if="store.loading && !store.items.length" class="text-sm text-ink/50">Loading…</p>

  <div v-else class="bg-white border border-gray-200 overflow-x-auto">
    <table class="w-full text-sm min-w-[700px]">
      <thead>
        <tr
          class="text-xs uppercase tracking-wide text-ink/40 font-medium border-b border-gray-200"
        >
          <th class="text-left px-5 py-3 font-medium">Service</th>
          <th class="text-left px-5 py-3 font-medium">Status</th>
          <th class="text-left px-5 py-3 font-medium">Categories</th>
          <th class="text-left px-5 py-3 font-medium">Actions</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="service in store.items" :key="service.id">
          <tr
            class="border-b border-gray-100"
            :class="{ 'opacity-50': service.status !== 'active' }"
          >
            <td class="px-5 py-3.5">
              <button class="flex items-center gap-2 font-medium" @click="toggle(service.id)">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  :stroke="service.status === 'active' ? '#8a8a86' : '#c5c5c1'"
                  stroke-width="2.5"
                  class="transition-transform"
                  :class="{ 'rotate-90': expandedId === service.id }"
                >
                  <polyline points="9 6 15 12 9 18" />
                </svg>
                {{ service.name }}
              </button>
            </td>
            <td class="px-5 py-3.5">
              <button
                type="button"
                class="text-xs font-semibold px-2.5 py-1"
                :class="
                  service.status === 'active' ? 'border border-ink' : 'bg-gray-100 text-ink/60'
                "
                @click="toggleStatus(service)"
              >
                {{ service.status === 'active' ? 'Active' : 'Coming Soon' }}
              </button>
            </td>
            <td class="px-5 py-3.5 text-ink/50">{{ service.categories.length }}</td>
            <td class="px-5 py-3.5">
              <div class="flex gap-3 text-xs font-semibold">
                <button type="button" class="hover:underline" @click="openEditModal(service)">
                  Edit
                </button>
                <button
                  type="button"
                  class="hover:underline text-ink/50"
                  @click="onDelete(service)"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
          <tr v-if="expandedId === service.id" class="border-b border-gray-100 bg-gray-50/60">
            <td colspan="4" class="px-5 pl-12 py-4">
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="category in service.categories"
                  :key="category.id"
                  class="text-xs border border-gray-300 bg-white px-3 py-1.5"
                  >{{ category.name }}</span
                >
                <RouterLink
                  :to="{ name: 'admin-categories' }"
                  class="text-xs border border-dashed border-ink px-3 py-1.5 font-medium hover:bg-ink hover:text-paper transition-colors"
                >
                  Manage in Categories →
                </RouterLink>
              </div>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>

  <p class="text-xs text-ink/40">
    Click a service name to expand its categories. Click the status badge to toggle Active / Coming
    Soon.
  </p>

  <BModal v-model="showModal" :title="editingService ? 'Edit Service' : 'Add Service'" no-footer>
    <form class="flex flex-col gap-4" @submit.prevent="submitForm">
      <div class="flex flex-col gap-1.5">
        <label class="text-xs font-semibold uppercase tracking-wide text-ink/60">Name</label>
        <input
          v-model="form.name"
          type="text"
          required
          class="border border-gray-300 h-10 px-3 text-sm focus:outline-none focus:border-ink"
        />
        <p v-if="formErrors.name" class="text-xs text-red-600">{{ formErrors.name[0] }}</p>
      </div>
      <div class="flex flex-col gap-1.5">
        <label class="text-xs font-semibold uppercase tracking-wide text-ink/60">Description</label>
        <textarea
          v-model="form.description"
          rows="3"
          class="border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-ink"
        ></textarea>
      </div>
      <div class="flex flex-col gap-1.5">
        <label class="text-xs font-semibold uppercase tracking-wide text-ink/60">Icon</label>
        <input
          v-model="form.icon"
          type="text"
          placeholder="tshirt, tag, box, or palette"
          class="border border-gray-300 h-10 px-3 text-sm focus:outline-none focus:border-ink"
        />
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div class="flex flex-col gap-1.5">
          <label class="text-xs font-semibold uppercase tracking-wide text-ink/60">Status</label>
          <select
            v-model="form.status"
            class="border border-gray-300 h-10 px-3 text-sm focus:outline-none focus:border-ink"
          >
            <option value="active">Active</option>
            <option value="coming_soon">Coming Soon</option>
          </select>
        </div>
        <div class="flex flex-col gap-1.5">
          <label class="text-xs font-semibold uppercase tracking-wide text-ink/60"
            >Sort Order</label
          >
          <input
            v-model.number="form.sort_order"
            type="number"
            min="0"
            class="border border-gray-300 h-10 px-3 text-sm focus:outline-none focus:border-ink"
          />
        </div>
      </div>
      <div class="flex justify-end gap-3 pt-2">
        <button
          type="button"
          class="text-sm font-semibold px-4 py-2.5 hover:underline"
          @click="showModal = false"
        >
          Cancel
        </button>
        <button
          type="submit"
          :disabled="saving"
          class="bg-ink text-paper text-sm font-semibold px-5 py-2.5 hover:bg-accent transition-colors disabled:opacity-50"
        >
          {{ saving ? 'Saving…' : 'Save' }}
        </button>
      </div>
    </form>
  </BModal>
</template>
