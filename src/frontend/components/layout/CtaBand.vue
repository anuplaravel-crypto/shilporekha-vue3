<script setup>
defineProps({
  heading: { type: String, required: true },
})
</script>

<template>
  <section class="bg-ink text-paper">
    <div class="max-w-6xl mx-auto px-6 py-16 flex flex-wrap items-center justify-between gap-6">
      <h2 class="font-display text-3xl max-w-md">{{ heading }}</h2>
      <RouterLink
        :to="{ name: 'contact' }"
        class="bg-accent text-ink text-sm uppercase tracking-wide font-semibold px-7 py-4 hover:bg-paper transition-colors"
      >
        Start a Project →
      </RouterLink>
    </div>
  </section>
</template>
