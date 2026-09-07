<script setup>
import { reactive, ref } from 'vue'

const form = reactive({
  name: '',
  email: '',
  serviceType: 'T-Shirt Design',
  budgetRange: 'Under $100',
  timeline: '',
  description: '',
})
const files = ref(null)
const submitted = ref(false)

function onSubmit() {
  // Static demo for now — the API phase wires this to POST /api/orders.
  submitted.value = true
}

const sidebarTestimonials = [
  {
    quote: 'Fast, clear communication and the final files were print-ready — zero back and forth with our printer.',
    name: 'Jordan Blake — Ratio Streetwear',
  },
  {
    quote: "Understood our band's whole vibe from one reference photo. Would order again.",
    name: 'Priya Nair — The Night Shift',
  },
]
</script>

<template>
  <section class="max-w-6xl mx-auto px-6 pt-16 pb-10">
    <h1 class="font-display text-5xl text-offset mb-4">Start a Project</h1>
    <p class="text-ink/70 max-w-xl">Tell me about your project and I'll follow up within 1–2 business days.</p>
  </section>

  <section class="max-w-6xl mx-auto px-6 py-10 border-t border-ink/10 grid grid-cols-1 lg:grid-cols-3 gap-12">
    <form class="lg:col-span-2 flex flex-col gap-6" @submit.prevent="onSubmit">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div class="flex flex-col gap-1.5">
          <label class="text-xs uppercase tracking-wide font-semibold text-ink/60">Name</label>
          <input v-model="form.name" type="text" required class="border border-ink/30 bg-white h-12 px-3 focus:outline-none focus:border-accent">
        </div>
        <div class="flex flex-col gap-1.5">
          <label class="text-xs uppercase tracking-wide font-semibold text-ink/60">Email</label>
          <input v-model="form.email" type="email" required class="border border-ink/30 bg-white h-12 px-3 focus:outline-none focus:border-accent">
        </div>
        <div class="flex flex-col gap-1.5">
          <label class="text-xs uppercase tracking-wide font-semibold text-ink/60">Service Type</label>
          <select v-model="form.serviceType" class="border border-ink/30 bg-white h-12 px-3 focus:outline-none focus:border-accent">
            <option>T-Shirt Design</option>
            <option>Logo Design (coming soon)</option>
            <option>Packaging (coming soon)</option>
            <option>Branding (coming soon)</option>
          </select>
        </div>
        <div class="flex flex-col gap-1.5">
          <label class="text-xs uppercase tracking-wide font-semibold text-ink/60">Budget Range</label>
          <select v-model="form.budgetRange" class="border border-ink/30 bg-white h-12 px-3 focus:outline-none focus:border-accent">
            <option>Under $100</option>
            <option>$100 – $250</option>
            <option>$250 – $500</option>
            <option>$500+</option>
          </select>
        </div>
        <div class="flex flex-col gap-1.5 sm:col-span-2">
          <label class="text-xs uppercase tracking-wide font-semibold text-ink/60">Timeline / Deadline</label>
          <input v-model="form.timeline" type="text" placeholder="e.g. Needed by Oct 15" class="border border-ink/30 bg-white h-12 px-3 focus:outline-none focus:border-accent">
        </div>
        <div class="flex flex-col gap-1.5 sm:col-span-2">
          <label class="text-xs uppercase tracking-wide font-semibold text-ink/60">Style References</label>
          <label class="border-2 border-dashed border-ink/30 bg-ink/5 h-24 flex items-center justify-center gap-2.5 cursor-pointer hover:border-accent transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v12"/><path d="M7 8l5-5 5 5"/><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/></svg>
            <span class="text-sm text-ink/60">Drag &amp; drop files, or click to upload</span>
            <input type="file" class="hidden" multiple @change="files = $event.target.files">
          </label>
        </div>
        <div class="flex flex-col gap-1.5 sm:col-span-2">
          <label class="text-xs uppercase tracking-wide font-semibold text-ink/60">Project Description</label>
          <textarea v-model="form.description" rows="5" placeholder="What do you need, who's it for, any must-haves..." class="border border-ink/30 bg-white p-3 focus:outline-none focus:border-accent"></textarea>
        </div>
      </div>
      <button type="submit" class="bg-ink text-paper text-sm uppercase tracking-wide font-semibold px-8 py-4 w-fit hover:bg-accent transition-colors">Submit Brief</button>
      <p v-if="submitted" class="text-sm text-accent">This is a static demo — connect this form to your Laravel backend to actually receive briefs.</p>
    </form>

    <aside class="flex flex-col gap-8">
      <div class="border border-ink/15 p-6 flex flex-col gap-3">
        <span class="text-xs uppercase tracking-wide font-semibold text-ink/50">Direct Contact</span>
        <a href="mailto:hello@cottonandink.studio" class="font-semibold hover:text-accent">hello@cottonandink.studio</a>
        <span class="text-sm text-ink/60">Remote / Worldwide</span>
        <span class="text-sm text-ink/60">Replies within 1–2 business days</span>
      </div>
      <div class="border border-ink/15 p-6 flex flex-col gap-4">
        <span class="text-xs uppercase tracking-wide font-semibold text-ink/50">Kind Words</span>
        <template v-for="(t, i) in sidebarTestimonials" :key="t.name">
          <div class="flex flex-col gap-2" :class="{ 'pt-4 border-t border-ink/10': i > 0 }">
            <div class="text-accent text-xs">★★★★★</div>
            <p class="text-sm text-ink/70">"{{ t.quote }}"</p>
            <div class="text-xs font-semibold">{{ t.name }}</div>
          </div>
        </template>
      </div>
    </aside>
  </section>
</template>
