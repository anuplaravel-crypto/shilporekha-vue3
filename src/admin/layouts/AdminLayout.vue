<script setup>
import { ref } from 'vue'
import Sidebar from '@/admin/components/layout/Sidebar.vue'
import Topbar from '@/admin/components/layout/Topbar.vue'

const sidebarOpen = ref(false)
</script>

<template>
  <Sidebar :open="sidebarOpen" @close="sidebarOpen = false" />

  <div class="lg:pl-64">
    <Topbar @toggle-sidebar="sidebarOpen = true" />
    <main class="p-6 lg:p-8 flex flex-col gap-6">
      <RouterView />
    </main>
  </div>
</template>
