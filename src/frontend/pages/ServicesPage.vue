<script setup>
import { services } from '@/frontend/data/placeholderData'
import CtaBand from '@/frontend/components/layout/CtaBand.vue'

const comingSoonServices = services.filter((s) => s.status !== 'active')

const tshirtFeatures = [
  'Custom illustration & typography',
  'Print-ready files (vector + raster)',
  'Mockups for your store or socials',
  'Multiple rounds of revisions, by package',
]
</script>

<template>
  <section class="max-w-6xl mx-auto px-6 pt-16 pb-10">
    <h1 class="font-display text-5xl text-offset mb-4">Services</h1>
    <p class="text-ink/70 max-w-xl">Right now I specialize in one thing and do it well: custom t-shirt graphics. Logo, packaging, and full brand identity work are coming as the studio grows.</p>
  </section>

  <!-- T-SHIRT DESIGN (ACTIVE) -->
  <section class="max-w-6xl mx-auto px-6 py-10 border-t border-ink/10">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start border-2 border-ink p-8 sm:p-10">
      <div class="flex flex-col gap-5">
        <span class="inline-block w-fit text-[10px] uppercase tracking-wide font-semibold text-accent border border-accent px-3 py-1">Available Now</span>
        <h2 class="font-display text-3xl">T-Shirt Design</h2>
        <p class="text-sm text-ink/70">Custom illustration and typography built for print — from a single graphic tee to a full merch drop. Every design ships print-ready, no extra prep needed on your end.</p>
        <ul class="flex flex-col gap-2 text-sm">
          <li v-for="feature in tshirtFeatures" :key="feature" class="flex gap-2 items-start">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="mt-0.5 shrink-0"><polyline points="20 6 9 17 4 12"/></svg>
            {{ feature }}
          </li>
        </ul>
        <div class="flex flex-wrap gap-4 mt-2">
          <RouterLink :to="{ name: 'pricing' }" class="bg-ink text-paper text-sm uppercase tracking-wide font-semibold px-6 py-3.5 hover:bg-accent transition-colors">View Pricing →</RouterLink>
          <RouterLink :to="{ name: 'portfolio' }" class="border border-ink text-sm uppercase tracking-wide font-semibold px-6 py-3.5 hover:border-accent hover:text-accent transition-colors">See Examples</RouterLink>
        </div>
      </div>
      <img src="https://placehold.co/600x600/0a0a0a/faf9f6?font=montserrat&text=TEE+DESIGN+SAMPLE" alt="T-shirt design sample" class="w-full aspect-square object-cover border border-ink">
    </div>
  </section>

  <!-- COMING SOON SERVICES -->
  <section class="max-w-6xl mx-auto px-6 py-16 border-t border-ink/10">
    <h2 class="font-display text-2xl mb-8">Coming Soon</h2>
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <div v-for="service in comingSoonServices" :key="service.slug" class="border border-ink/20 p-7 flex flex-col gap-3 opacity-60">
        <span class="text-[10px] uppercase tracking-wide font-semibold text-ink/50">Coming Soon</span>
        <h3 class="font-display text-xl">{{ service.pageName ?? service.name }}</h3>
        <p class="text-sm text-ink/50 flex-1">{{ service.longDescription }}</p>
        <span class="text-xs text-ink/40 uppercase tracking-wide">Not yet available</span>
      </div>
    </div>
  </section>

  <CtaBand heading="Ready to get your design started?" />
</template>
