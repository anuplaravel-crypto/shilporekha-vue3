<script setup>
defineProps({
  open: { type: Boolean, default: false },
})
defineEmits(['close'])

const navLinks = [
  { to: { name: 'admin-dashboard' }, label: 'Dashboard', icon: 'grid' },
  { to: { name: 'admin-services' }, label: 'Services', icon: 'tshirt' },
  { to: { name: 'admin-portfolio' }, label: 'Portfolio', icon: 'image' },
  { to: { name: 'admin-pricing' }, label: 'Pricing', icon: 'tag' },
  { to: { name: 'admin-orders' }, label: 'Orders', icon: 'inbox' },
  { to: { name: 'admin-testimonials' }, label: 'Testimonials', icon: 'message' },
  { to: { name: 'admin-settings' }, label: 'Settings', icon: 'gear' },
]
</script>

<template>
  <aside
    class="fixed inset-y-0 left-0 z-40 w-64 bg-ink text-white flex flex-col transition-transform duration-200 lg:translate-x-0"
    :class="open ? 'translate-x-0' : '-translate-x-full'"
  >
    <div class="px-6 py-6 border-b border-white/10">
      <div class="font-display text-lg tracking-wide">COTTON &amp; INK</div>
      <div class="text-[10px] uppercase tracking-[0.2em] text-white/40 mt-1">Admin Panel</div>
    </div>

    <nav class="flex-1 px-3 py-4 flex flex-col gap-1 text-sm">
      <RouterLink
        v-for="link in navLinks"
        :key="link.label"
        :to="link.to"
        class="nav-link flex items-center gap-3 px-3 py-2.5 text-white/70"
        active-class="active text-white"
        @click="$emit('close')"
      >
        <svg v-if="link.icon === 'grid'" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>
        <svg v-else-if="link.icon === 'tshirt'" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M8 3L4 6l2 3 2-1v11h8V8l2 1 2-3-4-3-2 1a2 2 0 0 1-4 0z"/></svg>
        <svg v-else-if="link.icon === 'image'" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
        <svg v-else-if="link.icon === 'tag'" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M20.59 13.41 13.42 20.6a2 2 0 0 1-2.83 0L3 13V3h10l7.59 7.59a2 2 0 0 1 0 2.82z"/><circle cx="7.5" cy="7.5" r="1.5"/></svg>
        <svg v-else-if="link.icon === 'inbox'" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>
        <svg v-else-if="link.icon === 'message'" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        <svg v-else-if="link.icon === 'gear'" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
        {{ link.label }}
      </RouterLink>
    </nav>

    <div class="px-4 py-4 border-t border-white/10 flex items-center gap-3">
      <div class="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-semibold shrink-0">A</div>
      <div class="flex-1 text-sm truncate">Admin User</div>
      <RouterLink :to="{ name: 'admin-login' }" title="Log out" class="text-white/40 hover:text-white shrink-0">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
      </RouterLink>
    </div>
  </aside>

  <div v-if="open" class="fixed inset-0 bg-black/40 z-30 lg:hidden" @click="$emit('close')"></div>
</template>
