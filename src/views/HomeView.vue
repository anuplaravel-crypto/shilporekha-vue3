<script setup>
import { ref } from 'vue'

// Proves BootstrapVueNext's component + reactive state wiring works.
const showModal = ref(false)
</script>

<template>
  <section class="max-w-3xl mx-auto px-6 py-16 text-center">
    <h1 class="text-4xl font-bold text-gray-900">ShilpoRekha</h1>
    <p class="mt-3 text-gray-600">
      Home page — Tailwind is styling this text, and the button below is a real
      BootstrapVueNext component.
    </p>

    <BButton variant="primary" class="mt-6" @click="showModal = true">
      Open test modal
    </BButton>

    <BModal v-model="showModal" title="Wiring check" ok-only>
      Tailwind, BootstrapVueNext, and Vue Router are all connected correctly.
    </BModal>
  </section>
</template>
