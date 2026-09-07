<script setup></script>

<template>
  <footer class="border-t border-ink/10">
    <div class="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
      <div class="flex flex-col gap-3 lg:col-span-2">
        <span class="font-display text-xl">COTTON &amp; INK</span>
        <p class="text-sm text-ink/60 max-w-xs">Custom t-shirt graphics for streetwear brands, bands, and small businesses. Logo, packaging &amp; branding work coming soon.</p>
      </div>
      <div class="flex flex-col gap-3 text-sm">
        <span class="font-semibold uppercase tracking-wide text-xs text-ink/50">Studio</span>
        <RouterLink :to="{ name: 'services' }" class="hover:text-accent">Services</RouterLink>
        <RouterLink :to="{ name: 'portfolio' }" class="hover:text-accent">Portfolio</RouterLink>
        <RouterLink :to="{ name: 'pricing' }" class="hover:text-accent">Pricing</RouterLink>
        <RouterLink :to="{ name: 'contact' }" class="hover:text-accent">Contact</RouterLink>
      </div>
      <div class="flex flex-col gap-3 text-sm">
        <span class="font-semibold uppercase tracking-wide text-xs text-ink/50">Contact</span>
        <a href="mailto:hello@cottonandink.studio" class="hover:text-accent">hello@cottonandink.studio</a>
        <span class="text-ink/60">Remote / Worldwide</span>
        <div class="flex gap-3 mt-1">
          <a href="#" aria-label="Instagram"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/></svg></a>
          <a href="#" aria-label="Behance"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="9" height="10" rx="1"/><path d="M13 17V7h5a2.5 2.5 0 0 1 0 5h-5"/></svg></a>
          <a href="#" aria-label="Dribbble"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M3.5 9c4 1.5 9 1.5 15 0M4.5 17c3-4 7-6 15-4"/></svg></a>
        </div>
      </div>
    </div>
    <div class="border-t border-ink/10 py-6 text-center text-xs text-ink/50">© 2026 Cotton &amp; Ink Studio. All rights reserved. — Dummy content for template preview.</div>
  </footer>
</template>
