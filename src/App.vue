<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="border-b border-gray-200">
    <nav class="max-w-5xl mx-auto px-6 py-4 flex items-center gap-6 text-sm font-medium text-gray-700">
      <RouterLink to="/" class="font-bold text-gray-900">ShilpoRekha</RouterLink>
      <RouterLink to="/services" class="hover:text-gray-900">Services</RouterLink>
      <RouterLink to="/portfolio" class="hover:text-gray-900">Portfolio</RouterLink>
      <RouterLink to="/pricing" class="hover:text-gray-900">Pricing</RouterLink>
      <RouterLink to="/contact" class="hover:text-gray-900">Contact</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>
