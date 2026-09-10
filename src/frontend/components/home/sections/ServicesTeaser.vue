<script setup>
import { onMounted } from 'vue'
import { useServicesStore } from '@/stores/services'

const servicesStore = useServicesStore()
onMounted(() => servicesStore.fetchAll())
</script>

<template>
  <section class="max-w-6xl mx-auto px-6 py-16 border-t border-ink/10">
    <div class="flex flex-wrap justify-between items-end gap-4 mb-10">
      <h2 class="font-display text-3xl">What I Do</h2>
      <RouterLink
        :to="{ name: 'services' }"
        class="text-sm uppercase tracking-wide font-semibold hover:text-accent"
        >All Services →</RouterLink
      >
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <div
        v-for="service in servicesStore.items"
        :key="service.slug"
        class="p-6 flex flex-col gap-3"
        :class="
          service.status === 'active'
            ? 'card-hover border-2 border-ink bg-paper'
            : 'border border-ink/20 opacity-50'
        "
      >
        <div
          class="w-11 h-11 rounded-full flex items-center justify-center"
          :class="
            service.status === 'active'
              ? 'border border-ink text-ink'
              : 'border border-ink/30 text-ink/50'
          "
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.6"
          >
            <path v-if="service.icon === 'box'" d="M21 8l-9-5-9 5 9 5 9-5z" />
            <path v-if="service.icon === 'box'" d="M3 8v8l9 5 9-5V8" />
            <path v-if="service.icon === 'box'" d="M12 13v8" />
            <path
              v-if="service.icon === 'palette'"
              d="M12 2a10 10 0 1 0 0 20c1.1 0 2-.9 2-2 0-.5-.2-1-.5-1.3-.3-.4-.5-.8-.5-1.3 0-1.1.9-2 2-2h2.3A5.2 5.2 0 0 0 22 12 10 10 0 0 0 12 2z"
            />
            <circle v-if="service.icon === 'palette'" cx="7" cy="10" r="1" />
            <circle v-if="service.icon === 'palette'" cx="10" cy="6.5" r="1" />
            <circle v-if="service.icon === 'palette'" cx="15" cy="7" r="1" />
            <circle v-if="service.icon === 'palette'" cx="17" cy="11" r="1" />
            <path
              v-if="service.icon === 'tag'"
              d="M20.59 13.41 13.42 20.6a2 2 0 0 1-2.83 0L3 13V3h10l7.59 7.59a2 2 0 0 1 0 2.82z"
            />
            <circle v-if="service.icon === 'tag'" cx="7.5" cy="7.5" r="1.5" />
            <path
              v-if="service.icon === 'tshirt'"
              d="M8 3L4 6l2 3 2-1v11h8V8l2 1 2-3-4-3-2 1a2 2 0 0 1-4 0z"
            />
          </svg>
        </div>
        <span
          class="text-[10px] uppercase tracking-wide font-semibold"
          :class="service.status === 'active' ? 'text-accent' : 'text-ink/50'"
        >
          {{ service.status === 'active' ? 'Available Now' : 'Coming Soon' }}
        </span>
        <h3 class="font-display text-xl">{{ service.name }}</h3>
        <p
          class="text-sm flex-1"
          :class="service.status === 'active' ? 'text-ink/60' : 'text-ink/50'"
        >
          {{ service.description }}
        </p>
      </div>
    </div>
  </section>
</template>
