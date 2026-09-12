<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useStylesStore } from '@/stores/styles'

const store = useStylesStore()
onMounted(() => store.fetchAll())

const showModal = ref(false)
const editingStyle = ref(null)
const saving = ref(false)
const errors = ref({})
const form = reactive({ name: '' })

function openCreate() {
  editingStyle.value = null
  form.name = ''
  errors.value = {}
  showModal.value = true
}

function openEdit(style) {
  editingStyle.value = style
  form.name = style.name
  errors.value = {}
  showModal.value = true
}

async function submitForm() {
  saving.value = true
  errors.value = {}
  try {
    if (editingStyle.value) {
      await store.update(editingStyle.value.id, { ...form })
    } else {
      await store.create({ ...form })
    }
    showModal.value = false
  } catch (error) {
    errors.value = error.response?.data?.errors ?? {}
  } finally {
    saving.value = false
  }
}

async function onDelete(style) {
  if (!confirm(`Delete style "${style.name}"?`)) return
  await store.remove(style.id)
}
</script>

<template>
  <div class="flex items-center justify-between">
    <p class="text-sm text-ink/50">
      A global style tag products can optionally use (e.g. Minimalist, Vintage).
    </p>
    <button
      class="bg-ink text-paper text-sm font-semibold px-5 py-2.5 hover:bg-accent transition-colors"
      @click="openCreate"
    >
      + Add Style
    </button>
  </div>

  <p v-if="store.loading && !store.items.length" class="text-sm text-ink/50">Loading…</p>

  <div v-else class="bg-white border border-gray-200 overflow-x-auto">
    <table class="w-full text-sm min-w-[400px]">
      <thead>
        <tr
          class="text-xs uppercase tracking-wide text-ink/40 font-medium border-b border-gray-200"
        >
          <th class="text-left px-5 py-3 font-medium">Name</th>
          <th class="text-left px-5 py-3 font-medium">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="style in store.items" :key="style.id" class="border-b border-gray-100">
          <td class="px-5 py-3.5">{{ style.name }}</td>
          <td class="px-5 py-3.5">
            <div class="flex gap-3 text-xs font-semibold">
              <button type="button" class="hover:underline" @click="openEdit(style)">Edit</button>
              <button type="button" class="hover:underline text-ink/50" @click="onDelete(style)">
                Delete
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <BModal v-model="showModal" :title="editingStyle ? 'Edit Style' : 'Add Style'" no-footer>
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
