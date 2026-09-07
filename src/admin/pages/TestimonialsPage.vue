<script setup>
import { ref } from 'vue'
import { testimonials as initialTestimonials } from '@/admin/data/adminData'
import Switch from '@/admin/components/ui/Switch.vue'

const testimonials = ref(initialTestimonials.map((t) => ({ ...t })))
</script>

<template>
  <div class="flex items-center justify-between">
    <h1 class="text-2xl font-semibold">Testimonials</h1>
    <button class="bg-ink text-paper text-sm font-semibold px-5 py-2.5 hover:bg-accent transition-colors">+ Add Testimonial</button>
  </div>

  <div class="bg-white border border-gray-200 overflow-x-auto">
    <table class="w-full text-sm min-w-[700px]">
      <thead>
        <tr class="text-xs uppercase tracking-wide text-ink/40 font-medium border-b border-gray-200">
          <th class="text-left px-5 py-3 font-medium">Client</th>
          <th class="text-left px-5 py-3 font-medium">Company</th>
          <th class="text-left px-5 py-3 font-medium">Quote</th>
          <th class="text-left px-5 py-3 font-medium">Rating</th>
          <th class="text-left px-5 py-3 font-medium">Featured</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="t in testimonials" :key="t.name" class="border-b border-gray-100 last:border-b-0">
          <td class="px-5 py-4 font-medium">{{ t.name }}</td>
          <td class="px-5 py-4 text-ink/50">{{ t.company }}</td>
          <td class="px-5 py-4 text-ink/60 max-w-xs truncate">"{{ t.quote }}"</td>
          <td class="px-5 py-4">
            <div class="flex gap-0.5 text-accent">
              <svg v-for="n in t.rating" :key="n" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7-6.2-3.8-6.2 3.8 1.6-7L2 9.2l7.1-.6z"/></svg>
            </div>
          </td>
          <td class="px-5 py-4"><Switch v-model="t.featured" /></td>
        </tr>
      </tbody>
    </table>
  </div>

  <p class="text-xs text-ink/40">The "featured" switch controls whether a testimonial appears in the homepage carousel.</p>
</template>
