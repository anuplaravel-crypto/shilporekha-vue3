<script setup>
import { packages, faqs } from '@/frontend/data/placeholderData'
import CtaBand from '@/frontend/components/layout/CtaBand.vue'
</script>

<template>
  <section class="max-w-6xl mx-auto px-6 pt-16 pb-10">
    <h1 class="font-display text-5xl text-offset mb-4">Pricing</h1>
    <p class="text-ink/70 max-w-xl">Simple, flat-rate packages for custom t-shirt graphics. Need something different? Reach out and we'll figure out a custom scope.</p>
  </section>

  <section class="max-w-6xl mx-auto px-6 py-10 border-t border-ink/10">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div
        v-for="pkg in packages"
        :key="pkg.name"
        class="p-8 flex flex-col gap-4 relative"
        :class="pkg.mostPopular ? 'border-2 border-ink bg-ink text-paper' : 'border border-ink'"
      >
        <span
          v-if="pkg.mostPopular"
          class="absolute -top-3 left-6 bg-accent text-ink text-[10px] uppercase tracking-wide font-semibold px-3 py-1"
        >
          Most Popular
        </span>
        <div
          class="font-semibold uppercase tracking-wide text-sm"
          :class="pkg.mostPopular ? 'text-paper/70' : 'text-ink/60'"
        >
          {{ pkg.name }}
        </div>
        <div class="font-display text-4xl">${{ pkg.price }}</div>
        <div class="flex flex-col gap-2 text-sm flex-1" :class="pkg.mostPopular ? 'text-paper/80' : 'text-ink/70'">
          <div v-for="feature in pkg.features" :key="feature" class="flex gap-2 items-start">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="mt-0.5 shrink-0"><polyline points="20 6 9 17 4 12"/></svg>
            {{ feature }}
          </div>
        </div>
        <RouterLink
          :to="{ name: 'contact' }"
          class="text-center text-sm uppercase tracking-wide font-semibold px-4 py-3 transition-colors"
          :class="pkg.mostPopular
            ? 'bg-accent text-ink hover:bg-paper'
            : 'border border-ink hover:border-accent hover:text-accent'"
        >
          Select
        </RouterLink>
      </div>
    </div>
    <p class="text-xs text-ink/40 mt-6">Prices &amp; features shown are placeholder examples — set your own once you finalize rates.</p>
  </section>

  <section class="max-w-6xl mx-auto px-6 py-16 border-t border-ink/10">
    <h2 class="font-display text-2xl mb-8">Common Questions</h2>
    <div class="flex flex-col divide-y divide-ink/10 border-t border-b border-ink/10">
      <div v-for="faq in faqs" :key="faq.question" class="py-5">
        <div class="font-semibold text-sm mb-1">{{ faq.question }}</div>
        <p class="text-sm text-ink/60">{{ faq.answer }}</p>
      </div>
    </div>
  </section>

  <CtaBand heading="Pick a package and let's get started." />
</template>
