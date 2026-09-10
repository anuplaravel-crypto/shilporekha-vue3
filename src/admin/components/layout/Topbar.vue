<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

defineEmits(['toggle-sidebar'])
const route = useRoute()
const router = useRouter()
const auth = useAuthStore()

async function onLogout() {
  await auth.logout()
  router.push({ name: 'admin-login' })
}
</script>

<template>
  <header
    class="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-6 lg:px-8 sticky top-0 z-20"
  >
    <div class="flex items-center gap-4">
      <button class="lg:hidden text-ink/70" aria-label="Open menu" @click="$emit('toggle-sidebar')">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>
      <div class="text-xs uppercase tracking-wide text-ink/40 font-medium">
        Admin / {{ route.meta.title }}
      </div>
    </div>
    <div class="flex items-center gap-3">
      <span class="text-xs text-ink/50 hidden sm:inline">{{ auth.user?.name }}</span>
      <button
        class="text-xs font-semibold text-ink/60 hover:text-ink hover:underline"
        @click="onLogout"
      >
        Log Out
      </button>
      <div class="w-9 h-9 rounded-full bg-gray-100 border border-gray-200"></div>
    </div>
  </header>
</template>
