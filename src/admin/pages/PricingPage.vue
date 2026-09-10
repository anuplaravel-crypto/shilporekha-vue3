<script setup>
import { computed, onMounted, ref } from 'vue'
import { packages as initialPackages } from '@/admin/data/adminData'
import { useServicesStore } from '@/stores/services'
import Switch from '@/admin/components/ui/Switch.vue'

const servicesStore = useServicesStore()
onMounted(() => servicesStore.fetchAll())

const packages = ref(initialPackages.map((pkg) => ({ ...pkg })))
const comingSoonServices = computed(() => servicesStore.items.filter((s) => s.status !== 'active'))

function setMostPopular(name) {
  packages.value.forEach((pkg) => {
    pkg.mostPopular = pkg.name === name ? !pkg.mostPopular : false
  })
}
</script>

<template>
  <h1 class="text-2xl font-semibold">Pricing / Packages</h1>

  <div class="flex flex-col gap-4">
    <div class="flex items-center justify-between">
      <div class="text-xs uppercase tracking-wide font-semibold">T-Shirt Design</div>
      <button
        class="border border-ink text-xs font-semibold px-4 py-2 hover:bg-ink hover:text-paper transition-colors"
      >
        + Add Package
      </button>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div
        v-for="pkg in packages"
        :key="pkg.name"
        class="bg-white p-5 flex flex-col gap-3 relative"
        :class="pkg.mostPopular ? 'border-2 border-ink' : 'border border-gray-200'"
      >
        <div
          v-if="pkg.mostPopular"
          class="absolute -top-3 left-5 bg-accent text-white text-[10px] font-semibold uppercase tracking-wide px-2.5 py-1 flex items-center gap-2"
        >
          Most Popular
          <Switch
            :model-value="pkg.mostPopular"
            style="transform: scale(0.85)"
            @update:model-value="setMostPopular(pkg.name)"
          />
        </div>
        <div class="font-semibold" :class="{ 'mt-1': pkg.mostPopular }">{{ pkg.name }}</div>
        <div class="flex items-center gap-1">
          <span class="text-ink/40">$</span>
          <input
            v-model="pkg.price"
            type="text"
            class="border border-gray-300 px-2 py-1 text-lg font-semibold w-20 focus:outline-none focus:border-ink"
          />
        </div>
        <ul class="flex flex-col gap-1.5 text-sm text-ink/70 flex-1">
          <li v-for="feature in pkg.features" :key="feature">— {{ feature }}</li>
        </ul>
        <button
          class="text-xs text-ink/50 border border-dashed border-gray-300 py-1.5 hover:border-ink hover:text-ink transition-colors"
        >
          + Add Feature
        </button>
        <div class="flex gap-4 text-xs font-semibold pt-1">
          <a href="#" class="hover:underline">Edit</a
          ><a href="#" class="hover:underline text-ink/50">Delete</a>
        </div>
      </div>
    </div>
    <p class="text-xs text-ink/40">
      The switch on "Most Popular" is exclusive — turning it on for one package turns it off for the
      others in this service.
    </p>
  </div>

  <div
    v-for="service in comingSoonServices"
    :key="service.slug"
    class="flex flex-col gap-3 opacity-50"
  >
    <div class="text-xs uppercase tracking-wide font-semibold">{{ service.name }}</div>
    <div class="bg-white border border-dashed border-gray-300 p-6 text-center text-sm text-ink/50">
      No packages yet — service is Coming Soon
    </div>
  </div>
</template>
