<script setup>
import { reactive } from 'vue'
import { siteSettings } from '@/admin/data/adminData'

const form = reactive({ ...siteSettings })
</script>

<template>
  <div class="max-w-2xl flex flex-col gap-8">
    <h1 class="text-2xl font-semibold">Site Settings</h1>

    <div class="flex flex-col gap-4">
      <div class="text-xs uppercase tracking-wide text-ink/40 font-medium border-b border-gray-200 pb-2">General</div>
      <div class="flex flex-col gap-1.5">
        <label class="text-xs font-semibold uppercase tracking-wide text-ink/60">Site Name</label>
        <input v-model="form.siteName" type="text" class="border border-gray-300 h-11 px-3 text-sm focus:outline-none focus:border-ink">
      </div>
      <div class="flex flex-col gap-1.5">
        <label class="text-xs font-semibold uppercase tracking-wide text-ink/60">Tagline</label>
        <input v-model="form.tagline" type="text" class="border border-gray-300 h-11 px-3 text-sm focus:outline-none focus:border-ink">
      </div>
    </div>

    <div class="flex flex-col gap-4">
      <div class="text-xs uppercase tracking-wide text-ink/40 font-medium border-b border-gray-200 pb-2">Contact</div>
      <div class="flex flex-col gap-1.5">
        <label class="text-xs font-semibold uppercase tracking-wide text-ink/60">Contact Email</label>
        <input v-model="form.contactEmail" type="email" class="border border-gray-300 h-11 px-3 text-sm focus:outline-none focus:border-ink">
      </div>
    </div>

    <div class="flex flex-col gap-4">
      <div class="text-xs uppercase tracking-wide text-ink/40 font-medium border-b border-gray-200 pb-2">Social Links</div>
      <div class="flex flex-col gap-1.5">
        <label class="text-xs font-semibold uppercase tracking-wide text-ink/60">Instagram URL</label>
        <input v-model="form.instagramUrl" type="url" placeholder="https://instagram.com/..." class="border border-gray-300 h-11 px-3 text-sm focus:outline-none focus:border-ink">
      </div>
      <div class="flex flex-col gap-1.5">
        <label class="text-xs font-semibold uppercase tracking-wide text-ink/60">Behance URL</label>
        <input v-model="form.behanceUrl" type="url" placeholder="https://behance.net/..." class="border border-gray-300 h-11 px-3 text-sm focus:outline-none focus:border-ink">
      </div>
      <div class="flex flex-col gap-1.5">
        <label class="text-xs font-semibold uppercase tracking-wide text-ink/60">Dribbble URL</label>
        <input v-model="form.dribbbleUrl" type="url" placeholder="https://dribbble.com/..." class="border border-gray-300 h-11 px-3 text-sm focus:outline-none focus:border-ink">
      </div>
    </div>

    <div>
      <button class="bg-ink text-paper text-sm font-semibold px-8 py-3 hover:bg-accent transition-colors">Save Changes</button>
    </div>
    <p class="text-xs text-ink/40 -mt-4">Each field here maps to one row in the site_settings key-value table.</p>
  </div>
</template>
