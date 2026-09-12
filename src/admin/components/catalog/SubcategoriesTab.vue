<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useServicesStore } from '@/stores/services'
import { useCategoriesStore } from '@/stores/categories'

const servicesStore = useServicesStore()
const categoriesStore = useCategoriesStore()

const selectedServiceId = ref(null)
const selectedCategoryId = ref(null)

onMounted(async () => {
  await servicesStore.fetchAll()
  if (servicesStore.items.length) {
    selectedServiceId.value = servicesStore.items[0].id
  }
})

watch(selectedServiceId, async (serviceId) => {
  selectedCategoryId.value = null
  if (!serviceId) return
  await categoriesStore.fetchAll(serviceId)
  if (categoriesStore.items.length) {
    selectedCategoryId.value = categoriesStore.items[0].id
  }
})

const selectedCategory = computed(() =>
  categoriesStore.items.find((c) => c.id === selectedCategoryId.value),
)
const subcategories = computed(() => selectedCategory.value?.subcategories ?? [])

// --- Add/Edit modal ---
const showModal = ref(false)
const editingSubcategory = ref(null)
const saving = ref(false)
const errors = ref({})
const form = reactive({ name: '', sort_order: 0 })

function openCreate() {
  editingSubcategory.value = null
  form.name = ''
  form.sort_order = subcategories.value.length
  errors.value = {}
  showModal.value = true
}

function openEdit(subcategory) {
  editingSubcategory.value = subcategory
  form.name = subcategory.name
  form.sort_order = subcategory.sort_order
  errors.value = {}
  showModal.value = true
}

async function submitForm() {
  saving.value = true
  errors.value = {}
  try {
    if (editingSubcategory.value) {
      await categoriesStore.updateSubcategory(editingSubcategory.value.id, { ...form })
    } else {
      await categoriesStore.createSubcategory(selectedCategoryId.value, { ...form })
    }
    showModal.value = false
  } catch (error) {
    errors.value = error.response?.data?.errors ?? {}
  } finally {
    saving.value = false
  }
}

async function onDelete(subcategory) {
  if (!confirm(`Delete subcategory "${subcategory.name}"?`)) return
  await categoriesStore.deleteSubcategory(subcategory.id)
}
</script>

<template>
  <div class="flex items-center justify-between flex-wrap gap-4">
    <div class="flex items-center gap-3 flex-wrap">
      <label class="text-xs font-semibold uppercase tracking-wide text-ink/60">Service</label>
      <select
        v-model.number="selectedServiceId"
        class="border border-gray-300 text-sm px-3 py-2 bg-white focus:outline-none focus:border-ink"
      >
        <option v-for="service in servicesStore.items" :key="service.id" :value="service.id">
          {{ service.name }}
        </option>
      </select>
      <label class="text-xs font-semibold uppercase tracking-wide text-ink/60">Category</label>
      <select
        v-model.number="selectedCategoryId"
        class="border border-gray-300 text-sm px-3 py-2 bg-white focus:outline-none focus:border-ink"
      >
        <option v-for="category in categoriesStore.items" :key="category.id" :value="category.id">
          {{ category.name }}
        </option>
      </select>
    </div>
    <button
      class="bg-ink text-paper text-sm font-semibold px-5 py-2.5 hover:bg-accent transition-colors"
      :disabled="!selectedCategoryId"
      @click="openCreate"
    >
      + Add Subcategory
    </button>
  </div>

  <p v-if="categoriesStore.loading && !categoriesStore.items.length" class="text-sm text-ink/50">
    Loading…
  </p>
  <p v-else-if="selectedCategoryId && !subcategories.length" class="text-sm text-ink/50">
    No subcategories yet for this category.
  </p>

  <div v-else-if="subcategories.length" class="bg-white border border-gray-200 overflow-x-auto">
    <table class="w-full text-sm min-w-[400px]">
      <thead>
        <tr
          class="text-xs uppercase tracking-wide text-ink/40 font-medium border-b border-gray-200"
        >
          <th class="text-left px-5 py-3 font-medium">Name</th>
          <th class="text-left px-5 py-3 font-medium">Sort Order</th>
          <th class="text-left px-5 py-3 font-medium">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="sub in subcategories" :key="sub.id" class="border-b border-gray-100">
          <td class="px-5 py-3.5">{{ sub.name }}</td>
          <td class="px-5 py-3.5 text-ink/50">{{ sub.sort_order }}</td>
          <td class="px-5 py-3.5">
            <div class="flex gap-3 text-xs font-semibold">
              <button type="button" class="hover:underline" @click="openEdit(sub)">Edit</button>
              <button type="button" class="hover:underline text-ink/50" @click="onDelete(sub)">
                Delete
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <BModal
    v-model="showModal"
    :title="editingSubcategory ? 'Edit Subcategory' : 'Add Subcategory'"
    no-footer
  >
    <form class="flex flex-col gap-4" @submit.prevent="submitForm">
      <div class="flex flex-col gap-1.5">
        <label class="text-xs font-semibold uppercase tracking-wide text-ink/60">Name</label>
        <input
          v-model="form.name"
          type="text"
          required
          class="border border-gray-300 h-10 px-3 text-sm focus:outline-none focus:border-ink"
        />
        <p v-if="errors.name" class="text-xs text-red-600">{{ errors.name[0] }}</p>
      </div>
      <div class="flex flex-col gap-1.5">
        <label class="text-xs font-semibold uppercase tracking-wide text-ink/60">Sort Order</label>
        <input
          v-model.number="form.sort_order"
          type="number"
          min="0"
          class="border border-gray-300 h-10 px-3 text-sm focus:outline-none focus:border-ink"
        />
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
