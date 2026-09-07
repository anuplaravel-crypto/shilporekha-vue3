<script setup>
const steps = [
  { n: 1, title: 'Order', text: 'Pick a package and submit your brief.' },
  { n: 2, title: 'Brief', text: 'We confirm scope, style & references.' },
  { n: 3, title: 'Draft', text: 'First concept delivered for review.' },
  { n: 4, title: 'Revisions', text: 'Rounds included per your package.' },
  { n: 5, title: 'Final Files', text: 'Print-ready files, delivered.' },
]
</script>

<template>
  <section class="max-w-6xl mx-auto px-6 py-16 border-t border-ink/10">
    <h2 class="font-display text-3xl mb-10">How It Works</h2>
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
      <div v-for="step in steps" :key="step.n" class="flex flex-col items-center text-center gap-3">
        <div class="w-12 h-12 rounded-full bg-ink text-paper flex items-center justify-center font-display text-lg">{{ step.n }}</div>
        <div class="font-semibold text-sm">{{ step.title }}</div>
        <p class="text-xs text-ink/60">{{ step.text }}</p>
      </div>
    </div>
  </section>
</template>
