<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()

const form = reactive({ name: '', email: '', password: '', passwordConfirmation: '' })
const errorMessage = ref('')
const fieldErrors = ref({})
const submitting = ref(false)

async function onSubmit() {
  errorMessage.value = ''
  fieldErrors.value = {}
  submitting.value = true
  try {
    await auth.register(form.name, form.email, form.password, form.passwordConfirmation)
    router.push({ name: 'admin-dashboard' })
  } catch (error) {
    if (error.response?.status === 422) {
      fieldErrors.value = error.response.data.errors ?? {}
      errorMessage.value = error.response.data.message
    } else {
      errorMessage.value =
        error.response?.data?.message || 'Something went wrong. Please try again.'
    }
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <div class="font-body bg-paper text-ink min-h-screen flex items-center justify-center px-6">
    <div class="w-full max-w-sm flex flex-col gap-8">
      <div class="text-center flex flex-col gap-1">
        <div class="font-display text-2xl tracking-wide">COTTON &amp; INK</div>
        <div class="text-[10px] uppercase tracking-[0.25em] text-ink/50">Admin Panel</div>
      </div>

      <form
        class="bg-white border border-gray-200 p-8 flex flex-col gap-5 shadow-sm"
        @submit.prevent="onSubmit"
      >
        <div
          v-if="errorMessage"
          class="text-xs text-red-600 bg-red-50 border border-red-200 px-3 py-2"
        >
          {{ errorMessage }}
        </div>
        <div class="flex flex-col gap-1.5">
          <label class="text-xs font-semibold uppercase tracking-wide text-ink/60">Name</label>
          <input
            v-model="form.name"
            type="text"
            required
            class="border border-gray-300 h-11 px-3 text-sm focus:outline-none focus:border-ink"
            placeholder="Your name"
          />
          <p v-if="fieldErrors.name" class="text-xs text-red-600">{{ fieldErrors.name[0] }}</p>
        </div>
        <div class="flex flex-col gap-1.5">
          <label class="text-xs font-semibold uppercase tracking-wide text-ink/60">Email</label>
          <input
            v-model="form.email"
            type="email"
            required
            class="border border-gray-300 h-11 px-3 text-sm focus:outline-none focus:border-ink"
            placeholder="you@cottonandink.studio"
          />
          <p v-if="fieldErrors.email" class="text-xs text-red-600">{{ fieldErrors.email[0] }}</p>
        </div>
        <div class="flex flex-col gap-1.5">
          <label class="text-xs font-semibold uppercase tracking-wide text-ink/60">Password</label>
          <input
            v-model="form.password"
            type="password"
            required
            minlength="8"
            class="border border-gray-300 h-11 px-3 text-sm focus:outline-none focus:border-ink"
            placeholder="••••••••"
          />
          <p v-if="fieldErrors.password" class="text-xs text-red-600">
            {{ fieldErrors.password[0] }}
          </p>
        </div>
        <div class="flex flex-col gap-1.5">
          <label class="text-xs font-semibold uppercase tracking-wide text-ink/60"
            >Confirm Password</label
          >
          <input
            v-model="form.passwordConfirmation"
            type="password"
            required
            minlength="8"
            class="border border-gray-300 h-11 px-3 text-sm focus:outline-none focus:border-ink"
            placeholder="••••••••"
          />
        </div>
        <button
          type="submit"
          :disabled="submitting"
          class="bg-ink text-paper text-center text-sm font-semibold uppercase tracking-wide py-3 hover:bg-accent transition-colors disabled:opacity-50"
        >
          {{ submitting ? 'Creating account…' : 'Register' }}
        </button>
      </form>

      <div class="text-center text-xs text-ink/40">
        Already have an account?
        <RouterLink :to="{ name: 'admin-login' }" class="text-ink underline hover:text-accent"
          >Log In</RouterLink
        >
      </div>
    </div>
  </div>
</template>
