<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const form = reactive({ email: '', password: '' })

function onSubmit() {
  // Static demo for now — the API phase wires this to Sanctum auth.
  router.push({ name: 'admin-dashboard' })
}
</script>

<template>
  <div class="font-body bg-paper text-ink min-h-screen flex items-center justify-center px-6">
    <div class="w-full max-w-sm flex flex-col gap-8">
      <div class="text-center flex flex-col gap-1">
        <div class="font-display text-2xl tracking-wide">COTTON &amp; INK</div>
        <div class="text-[10px] uppercase tracking-[0.25em] text-ink/50">Admin Panel</div>
      </div>

      <form class="bg-white border border-gray-200 p-8 flex flex-col gap-5 shadow-sm" @submit.prevent="onSubmit">
        <div class="flex flex-col gap-1.5">
          <label class="text-xs font-semibold uppercase tracking-wide text-ink/60">Email</label>
          <input v-model="form.email" type="email" required class="border border-gray-300 h-11 px-3 text-sm focus:outline-none focus:border-ink" placeholder="you@cottonandink.studio">
        </div>
        <div class="flex flex-col gap-1.5">
          <label class="text-xs font-semibold uppercase tracking-wide text-ink/60">Password</label>
          <input v-model="form.password" type="password" required class="border border-gray-300 h-11 px-3 text-sm focus:outline-none focus:border-ink" placeholder="••••••••">
        </div>
        <button type="submit" class="bg-ink text-paper text-center text-sm font-semibold uppercase tracking-wide py-3 hover:bg-accent transition-colors">Log In</button>
        <a href="#" class="text-center text-xs text-ink/50 hover:text-ink underline">Forgot password?</a>
      </form>

      <div class="text-center text-xs text-ink/40">Single admin login — no public sign-up.</div>
    </div>
  </div>
</template>
