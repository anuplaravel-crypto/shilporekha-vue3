<script setup>
import { ref } from 'vue'

const mobileMenuOpen = ref(false)

const navLinks = [
  { to: { name: 'home' }, label: 'Home' },
  { to: { name: 'services' }, label: 'Services' },
  { to: { name: 'portfolio' }, label: 'Portfolio' },
  { to: { name: 'pricing' }, label: 'Pricing' },
  { to: { name: 'contact' }, label: 'Contact' },
]
</script>

<template>
  <header class="sticky top-0 z-50 bg-paper/95 backdrop-blur border-b border-ink/10">
    <div class="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
      <RouterLink :to="{ name: 'home' }" class="flex flex-col leading-none">
        <span class="font-display text-2xl tracking-wide">COTTON &amp; INK</span>
        <span class="text-[10px] uppercase tracking-[0.2em] text-ink/60">Graphic Design Studio</span>
      </RouterLink>

      <nav class="hidden md:flex items-center gap-8 text-sm uppercase tracking-wide">
        <RouterLink
          v-for="link in navLinks"
          :key="link.label"
          :to="link.to"
          class="hover:text-accent"
          active-class="text-accent font-semibold"
        >
          {{ link.label }}
        </RouterLink>
      </nav>

      <RouterLink
        :to="{ name: 'contact' }"
        class="hidden md:inline-block bg-ink text-paper text-xs uppercase tracking-wide font-semibold px-5 py-3 hover:bg-accent transition-colors"
      >
        Start a Project
      </RouterLink>

      <button class="md:hidden" aria-label="Toggle menu" @click="mobileMenuOpen = !mobileMenuOpen">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
      </button>
    </div>

    <div v-show="mobileMenuOpen" class="md:hidden border-t border-ink/10 px-6 py-4 flex flex-col gap-4 text-sm uppercase tracking-wide">
      <RouterLink
        v-for="link in navLinks"
        :key="link.label"
        :to="link.to"
        active-class="text-accent font-semibold"
        @click="mobileMenuOpen = false"
      >
        {{ link.label }}
      </RouterLink>
    </div>
  </header>
</template>
