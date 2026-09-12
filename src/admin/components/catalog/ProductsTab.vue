<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useServicesStore } from '@/stores/services'
import { useCategoriesStore } from '@/stores/categories'
import { useStylesStore } from '@/stores/styles'
import { useProductsStore } from '@/stores/products'

const servicesStore = useServicesStore()
const categoriesStore = useCategoriesStore()
const stylesStore = useStylesStore()
const productsStore = useProductsStore()

onMounted(() => {
  servicesStore.fetchAll()
  stylesStore.fetchAll()
  productsStore.fetchAll()
})

function serviceName(id) {
  return servicesStore.items.find((s) => s.id === id)?.name ?? '—'
}

// --- Add/Edit modal ---
const showModal = ref(false)
const editingProduct = ref(null)
const saving = ref(false)
const errors = ref({})
const imageFile = ref(null)
const imagePreview = ref(null)

const form = reactive({
  service_id: null,
  category_id: null,
  subcategory_id: null,
  style_id: null,
  name: '',
  description: '',
  price: '',
  status: 'active',
  sort_order: 0,
})

// Categories for the form's currently-selected service (re-fetched whenever
// it changes) — subcategories come along nested on each category already.
watch(
  () => form.service_id,
  (serviceId) => {
    form.category_id = null
    form.subcategory_id = null
    if (serviceId) categoriesStore.fetchAll(serviceId, { force: true })
  },
)

watch(
  () => form.category_id,
  () => {
    form.subcategory_id = null
  },
)

const availableSubcategories = computed(() => {
  const category = categoriesStore.items.find((c) => c.id === form.category_id)
  return category?.subcategories ?? []
})

function resetForm() {
  form.service_id = servicesStore.items[0]?.id ?? null
  form.category_id = null
  form.subcategory_id = null
  form.style_id = null
  form.name = ''
  form.description = ''
  form.price = ''
  form.status = 'active'
  form.sort_order = productsStore.items.length
  imageFile.value = null
  imagePreview.value = null
  errors.value = {}
}

function openCreate() {
  editingProduct.value = null
  resetForm()
  showModal.value = true
}

async function openEdit(product) {
  editingProduct.value = product
  form.service_id = product.service_id
  await categoriesStore.fetchAll(product.service_id, { force: true })
  form.category_id = product.category_id
  form.subcategory_id = product.subcategory_id
  form.style_id = product.style_id
  form.name = product.name
  form.description = product.description ?? ''
  form.price = product.price
  form.status = product.status
  form.sort_order = product.sort_order
  imageFile.value = null
  imagePreview.value = product.image_url
  errors.value = {}
  showModal.value = true
}

function onImageChange(event) {
  const file = event.target.files[0]
  if (!file) return
  imageFile.value = file
  imagePreview.value = URL.createObjectURL(file)
}

function buildFormData() {
  const data = new FormData()
  data.append('service_id', form.service_id)
  data.append('category_id', form.category_id)
  data.append('subcategory_id', form.subcategory_id)
  if (form.style_id) data.append('style_id', form.style_id)
  data.append('name', form.name)
  if (form.description) data.append('description', form.description)
  data.append('price', form.price)
  data.append('status', form.status)
  data.append('sort_order', form.sort_order)
  if (imageFile.value) data.append('image', imageFile.value)
  return data
}

async function submitForm() {
  saving.value = true
  errors.value = {}
  try {
    const data = buildFormData()
    if (editingProduct.value) {
      await productsStore.update(editingProduct.value.id, data)
    } else {
      await productsStore.create(data)
    }
    showModal.value = false
  } catch (error) {
    errors.value = error.response?.data?.errors ?? {}
  } finally {
    saving.value = false
  }
}

async function onDelete(product) {
  if (!confirm(`Delete "${product.name}"? This cannot be undone.`)) return
  await productsStore.remove(product.id)
}
</script>

<template>
  <div class="flex items-center justify-between">
    <p class="text-sm text-ink/50">
      Products belong to one Service, Category, and Subcategory, with an optional Style.
    </p>
    <button
      class="bg-ink text-paper text-sm font-semibold px-5 py-2.5 hover:bg-accent transition-colors"
      @click="openCreate"
    >
      + Add Product
    </button>
  </div>

  <p v-if="productsStore.loading && !productsStore.items.length" class="text-sm text-ink/50">
    Loading…
  </p>

  <div v-else class="bg-white border border-gray-200 overflow-x-auto">
    <table class="w-full text-sm min-w-[800px]">
      <thead>
        <tr
          class="text-xs uppercase tracking-wide text-ink/40 font-medium border-b border-gray-200"
        >
          <th class="text-left px-5 py-3 font-medium">Image</th>
          <th class="text-left px-5 py-3 font-medium">Product</th>
          <th class="text-left px-5 py-3 font-medium">Service / Category / Subcategory</th>
          <th class="text-left px-5 py-3 font-medium">Price</th>
          <th class="text-left px-5 py-3 font-medium">Status</th>
          <th class="text-left px-5 py-3 font-medium">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="product in productsStore.items"
          :key="product.id"
          class="border-b border-gray-100"
          :class="{ 'opacity-50': product.status !== 'active' }"
        >
          <td class="px-5 py-3.5">
            <img
              :src="product.image_url"
              :alt="product.name"
              class="w-12 h-12 object-cover border border-gray-200"
            />
          </td>
          <td class="px-5 py-3.5 font-medium">{{ product.name }}</td>
          <td class="px-5 py-3.5 text-ink/50 text-xs">
            {{ serviceName(product.service_id) }} / {{ product.category?.name }} /
            {{ product.subcategory?.name }}
          </td>
          <td class="px-5 py-3.5">${{ product.price }}</td>
          <td class="px-5 py-3.5">
            <span
              class="text-xs font-semibold px-2.5 py-1"
              :class="product.status === 'active' ? 'border border-ink' : 'bg-gray-100 text-ink/60'"
            >
              {{ product.status === 'active' ? 'Active' : 'Inactive' }}
            </span>
          </td>
          <td class="px-5 py-3.5">
            <div class="flex gap-3 text-xs font-semibold">
              <button type="button" class="hover:underline" @click="openEdit(product)">Edit</button>
              <button type="button" class="hover:underline text-ink/50" @click="onDelete(product)">
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
    :title="editingProduct ? 'Edit Product' : 'Add Product'"
    no-footer
    size="lg"
  >
    <form class="flex flex-col gap-4" @submit.prevent="submitForm">
      <div class="grid grid-cols-2 gap-4">
        <div class="flex flex-col gap-1.5">
          <label class="text-xs font-semibold uppercase tracking-wide text-ink/60">Service</label>
          <select
            v-model.number="form.service_id"
            required
            class="border border-gray-300 h-10 px-3 text-sm focus:outline-none focus:border-ink"
          >
            <option v-for="service in servicesStore.items" :key="service.id" :value="service.id">
              {{ service.name }}
            </option>
          </select>
          <p v-if="errors.service_id" class="text-xs text-red-600">{{ errors.service_id[0] }}</p>
        </div>
        <div class="flex flex-col gap-1.5">
          <label class="text-xs font-semibold uppercase tracking-wide text-ink/60"
            >Style (optional)</label
          >
          <select
            v-model.number="form.style_id"
            class="border border-gray-300 h-10 px-3 text-sm focus:outline-none focus:border-ink"
          >
            <option :value="null">None</option>
            <option v-for="style in stylesStore.items" :key="style.id" :value="style.id">
              {{ style.name }}
            </option>
          </select>
        </div>
        <div class="flex flex-col gap-1.5">
          <label class="text-xs font-semibold uppercase tracking-wide text-ink/60">Category</label>
          <select
            v-model.number="form.category_id"
            required
            class="border border-gray-300 h-10 px-3 text-sm focus:outline-none focus:border-ink"
          >
            <option :value="null" disabled>Select a category</option>
            <option
              v-for="category in categoriesStore.items"
              :key="category.id"
              :value="category.id"
            >
              {{ category.name }}
            </option>
          </select>
          <p v-if="errors.category_id" class="text-xs text-red-600">{{ errors.category_id[0] }}</p>
        </div>
        <div class="flex flex-col gap-1.5">
          <label class="text-xs font-semibold uppercase tracking-wide text-ink/60"
            >Subcategory</label
          >
          <select
            v-model.number="form.subcategory_id"
            required
            :disabled="!form.category_id"
            class="border border-gray-300 h-10 px-3 text-sm focus:outline-none focus:border-ink disabled:bg-gray-50"
          >
            <option :value="null" disabled>Select a subcategory</option>
            <option v-for="sub in availableSubcategories" :key="sub.id" :value="sub.id">
              {{ sub.name }}
            </option>
          </select>
          <p v-if="errors.subcategory_id" class="text-xs text-red-600">
            {{ errors.subcategory_id[0] }}
          </p>
        </div>
      </div>

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
        <label class="text-xs font-semibold uppercase tracking-wide text-ink/60">Description</label>
        <textarea
          v-model="form.description"
          rows="3"
          class="border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-ink"
        ></textarea>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div class="flex flex-col gap-1.5">
          <label class="text-xs font-semibold uppercase tracking-wide text-ink/60">Price</label>
          <input
            v-model="form.price"
            type="number"
            step="0.01"
            min="0"
            required
            class="border border-gray-300 h-10 px-3 text-sm focus:outline-none focus:border-ink"
          />
          <p v-if="errors.price" class="text-xs text-red-600">{{ errors.price[0] }}</p>
        </div>
        <div class="flex flex-col gap-1.5">
          <label class="text-xs font-semibold uppercase tracking-wide text-ink/60">Status</label>
          <select
            v-model="form.status"
            class="border border-gray-300 h-10 px-3 text-sm focus:outline-none focus:border-ink"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div class="flex flex-col gap-1.5">
        <label class="text-xs font-semibold uppercase tracking-wide text-ink/60">Image</label>
        <input type="file" accept="image/*" class="text-sm" @change="onImageChange" />
        <p v-if="errors.image" class="text-xs text-red-600">{{ errors.image[0] }}</p>
        <img
          v-if="imagePreview"
          :src="imagePreview"
          alt="Preview"
          class="w-24 h-24 object-cover border border-gray-200 mt-1"
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
