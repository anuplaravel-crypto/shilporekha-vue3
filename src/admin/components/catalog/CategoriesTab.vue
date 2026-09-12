<script setup>
import { onMounted, reactive, ref, watch } from 'vue'
import { useServicesStore } from '@/stores/services'
import { useCategoriesStore } from '@/stores/categories'

const servicesStore = useServicesStore()
const categoriesStore = useCategoriesStore()

const selectedServiceId = ref(null)
const expandedCategoryId = ref(null)

onMounted(async () => {
  await servicesStore.fetchAll()
  if (servicesStore.items.length) {
    selectedServiceId.value = servicesStore.items[0].id
  }
})

watch(selectedServiceId, (serviceId) => {
  if (serviceId) categoriesStore.fetchAll(serviceId)
})

function toggle(categoryId) {
  expandedCategoryId.value = expandedCategoryId.value === categoryId ? null : categoryId
}

// --- Category add/edit modal ---
const showCategoryModal = ref(false)
const editingCategory = ref(null)
const categorySaving = ref(false)
const categoryErrors = ref({})
const categoryForm = reactive({ name: '', sort_order: 0 })

function openCreateCategory() {
  editingCategory.value = null
  categoryForm.name = ''
  categoryForm.sort_order = categoriesStore.items.length
  categoryErrors.value = {}
  showCategoryModal.value = true
}

function openEditCategory(category) {
  editingCategory.value = category
  categoryForm.name = category.name
  categoryForm.sort_order = category.sort_order
  categoryErrors.value = {}
  showCategoryModal.value = true
}

async function submitCategory() {
  categorySaving.value = true
  categoryErrors.value = {}
  try {
    if (editingCategory.value) {
      await categoriesStore.updateCategory(editingCategory.value.id, { ...categoryForm })
    } else {
      await categoriesStore.createCategory({ ...categoryForm, service_id: selectedServiceId.value })
    }
    showCategoryModal.value = false
  } catch (error) {
    categoryErrors.value = error.response?.data?.errors ?? {}
  } finally {
    categorySaving.value = false
  }
}

async function onDeleteCategory(category) {
  if (!confirm(`Delete category "${category.name}"? Its subcategories go with it.`)) return
  await categoriesStore.deleteCategory(category.id)
}

// --- Subcategory add/edit modal ---
const showSubcategoryModal = ref(false)
const editingSubcategory = ref(null)
const activeCategoryId = ref(null)
const subcategorySaving = ref(false)
const subcategoryErrors = ref({})
const subcategoryForm = reactive({ name: '', sort_order: 0 })

function openCreateSubcategory(category) {
  activeCategoryId.value = category.id
  editingSubcategory.value = null
  subcategoryForm.name = ''
  subcategoryForm.sort_order = category.subcategories.length
  subcategoryErrors.value = {}
  showSubcategoryModal.value = true
}

function openEditSubcategory(category, subcategory) {
  activeCategoryId.value = category.id
  editingSubcategory.value = subcategory
  subcategoryForm.name = subcategory.name
  subcategoryForm.sort_order = subcategory.sort_order
  subcategoryErrors.value = {}
  showSubcategoryModal.value = true
}

async function submitSubcategory() {
  subcategorySaving.value = true
  subcategoryErrors.value = {}
  try {
    if (editingSubcategory.value) {
      await categoriesStore.updateSubcategory(editingSubcategory.value.id, { ...subcategoryForm })
    } else {
      await categoriesStore.createSubcategory(activeCategoryId.value, { ...subcategoryForm })
    }
    showSubcategoryModal.value = false
  } catch (error) {
    subcategoryErrors.value = error.response?.data?.errors ?? {}
  } finally {
    subcategorySaving.value = false
  }
}

async function onDeleteSubcategory(subcategory) {
  if (!confirm(`Delete subcategory "${subcategory.name}"?`)) return
  await categoriesStore.deleteSubcategory(subcategory.id)
}
</script>

<template>
  <div class="flex items-center justify-between flex-wrap gap-4">
    <div class="flex items-center gap-3">
      <label class="text-xs font-semibold uppercase tracking-wide text-ink/60">Service</label>
      <select
        v-model.number="selectedServiceId"
        class="border border-gray-300 text-sm px-3 py-2 bg-white focus:outline-none focus:border-ink"
      >
        <option v-for="service in servicesStore.items" :key="service.id" :value="service.id">
          {{ service.name }}
        </option>
      </select>
    </div>
    <button
      class="bg-ink text-paper text-sm font-semibold px-5 py-2.5 hover:bg-accent transition-colors"
      :disabled="!selectedServiceId"
      @click="openCreateCategory"
    >
      + Add Category
    </button>
  </div>

  <p v-if="categoriesStore.loading && !categoriesStore.items.length" class="text-sm text-ink/50">
    Loading…
  </p>

  <div v-else class="bg-white border border-gray-200 overflow-x-auto">
    <table class="w-full text-sm min-w-[600px]">
      <thead>
        <tr
          class="text-xs uppercase tracking-wide text-ink/40 font-medium border-b border-gray-200"
        >
          <th class="text-left px-5 py-3 font-medium">Category</th>
          <th class="text-left px-5 py-3 font-medium">Subcategories</th>
          <th class="text-left px-5 py-3 font-medium">Actions</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="category in categoriesStore.items" :key="category.id">
          <tr class="border-b border-gray-100">
            <td class="px-5 py-3.5">
              <button class="flex items-center gap-2 font-medium" @click="toggle(category.id)">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#8a8a86"
                  stroke-width="2.5"
                  class="transition-transform"
                  :class="{ 'rotate-90': expandedCategoryId === category.id }"
                >
                  <polyline points="9 6 15 12 9 18" />
                </svg>
                {{ category.name }}
              </button>
            </td>
            <td class="px-5 py-3.5 text-ink/50">{{ category.subcategories.length }}</td>
            <td class="px-5 py-3.5">
              <div class="flex gap-3 text-xs font-semibold">
                <button type="button" class="hover:underline" @click="openEditCategory(category)">
                  Edit
                </button>
                <button
                  type="button"
                  class="hover:underline text-ink/50"
                  @click="onDeleteCategory(category)"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
          <tr
            v-if="expandedCategoryId === category.id"
            class="border-b border-gray-100 bg-gray-50/60"
          >
            <td colspan="3" class="px-5 pl-12 py-4">
              <div class="flex flex-col gap-2">
                <div
                  v-for="sub in category.subcategories"
                  :key="sub.id"
                  class="flex items-center justify-between text-xs border border-gray-300 bg-white px-3 py-1.5"
                >
                  <span>{{ sub.name }}</span>
                  <div class="flex gap-2 font-semibold">
                    <button
                      type="button"
                      class="hover:underline"
                      @click="openEditSubcategory(category, sub)"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      class="hover:underline text-ink/50"
                      @click="onDeleteSubcategory(sub)"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <button
                  class="text-xs border border-dashed border-ink px-3 py-1.5 font-medium hover:bg-ink hover:text-paper transition-colors w-fit"
                  @click="openCreateSubcategory(category)"
                >
                  + Add Subcategory
                </button>
              </div>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>

  <BModal
    v-model="showCategoryModal"
    :title="editingCategory ? 'Edit Category' : 'Add Category'"
    no-footer
  >
    <form class="flex flex-col gap-4" @submit.prevent="submitCategory">
      <div class="flex flex-col gap-1.5">
        <label class="text-xs font-semibold uppercase tracking-wide text-ink/60">Name</label>
        <input
          v-model="categoryForm.name"
          type="text"
          required
          class="border border-gray-300 h-10 px-3 text-sm focus:outline-none focus:border-ink"
        />
        <p v-if="categoryErrors.name" class="text-xs text-red-600">{{ categoryErrors.name[0] }}</p>
      </div>
      <div class="flex flex-col gap-1.5">
        <label class="text-xs font-semibold uppercase tracking-wide text-ink/60">Sort Order</label>
        <input
          v-model.number="categoryForm.sort_order"
          type="number"
          min="0"
          class="border border-gray-300 h-10 px-3 text-sm focus:outline-none focus:border-ink"
        />
      </div>
      <div class="flex justify-end gap-3 pt-2">
        <button
          type="button"
          class="text-sm font-semibold px-4 py-2.5 hover:underline"
          @click="showCategoryModal = false"
        >
          Cancel
        </button>
        <button
          type="submit"
          :disabled="categorySaving"
          class="bg-ink text-paper text-sm font-semibold px-5 py-2.5 hover:bg-accent transition-colors disabled:opacity-50"
        >
          {{ categorySaving ? 'Saving…' : 'Save' }}
        </button>
      </div>
    </form>
  </BModal>

  <BModal
    v-model="showSubcategoryModal"
    :title="editingSubcategory ? 'Edit Subcategory' : 'Add Subcategory'"
    no-footer
  >
    <form class="flex flex-col gap-4" @submit.prevent="submitSubcategory">
      <div class="flex flex-col gap-1.5">
        <label class="text-xs font-semibold uppercase tracking-wide text-ink/60">Name</label>
        <input
          v-model="subcategoryForm.name"
          type="text"
          required
          class="border border-gray-300 h-10 px-3 text-sm focus:outline-none focus:border-ink"
        />
        <p v-if="subcategoryErrors.name" class="text-xs text-red-600">
          {{ subcategoryErrors.name[0] }}
        </p>
      </div>
      <div class="flex flex-col gap-1.5">
        <label class="text-xs font-semibold uppercase tracking-wide text-ink/60">Sort Order</label>
        <input
          v-model.number="subcategoryForm.sort_order"
          type="number"
          min="0"
          class="border border-gray-300 h-10 px-3 text-sm focus:outline-none focus:border-ink"
        />
      </div>
      <div class="flex justify-end gap-3 pt-2">
        <button
          type="button"
          class="text-sm font-semibold px-4 py-2.5 hover:underline"
          @click="showSubcategoryModal = false"
        >
          Cancel
        </button>
        <button
          type="submit"
          :disabled="subcategorySaving"
          class="bg-ink text-paper text-sm font-semibold px-5 py-2.5 hover:bg-accent transition-colors disabled:opacity-50"
        >
          {{ subcategorySaving ? 'Saving…' : 'Save' }}
        </button>
      </div>
    </form>
  </BModal>
</template>
