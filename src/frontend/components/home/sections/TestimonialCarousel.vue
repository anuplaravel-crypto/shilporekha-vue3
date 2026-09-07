<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { testimonials } from '@/frontend/data/placeholderData'

const index = ref(0)
let autoplayTimer = null
let touchStartX = 0

function goTo(i) {
  index.value = (i + testimonials.length) % testimonials.length
}
function next() {
  goTo(index.value + 1)
}
function prev() {
  goTo(index.value - 1)
}
function startAutoplay() {
  autoplayTimer = setInterval(next, 6000)
}
function restartAutoplay() {
  clearInterval(autoplayTimer)
  startAutoplay()
}
function onDotClick(i) {
  goTo(i)
  restartAutoplay()
}
function onPrevClick() {
  prev()
  restartAutoplay()
}
function onNextClick() {
  next()
  restartAutoplay()
}
function onTouchStart(e) {
  touchStartX = e.touches[0].clientX
}
function onTouchEnd(e) {
  const dx = e.changedTouches[0].clientX - touchStartX
  if (Math.abs(dx) > 40) {
    dx < 0 ? next() : prev()
    restartAutoplay()
  }
}

onMounted(startAutoplay)
onUnmounted(() => clearInterval(autoplayTimer))
</script>

<template>
  <section class="max-w-6xl mx-auto px-6 py-16 border-t border-ink/10">
    <h2 class="font-display text-3xl mb-10">Kind Words</h2>
    <div class="relative" @mouseenter="clearInterval(autoplayTimer)" @mouseleave="startAutoplay">
      <div class="overflow-hidden">
        <div
          class="flex transition-transform duration-500 ease-out"
          :style="{ transform: `translateX(-${index * 100}%)` }"
          @touchstart="onTouchStart"
          @touchend="onTouchEnd"
        >
          <div v-for="t in testimonials" :key="t.name" class="w-full shrink-0 px-1 sm:px-10">
            <div class="border border-ink/15 p-8 sm:p-10 flex flex-col gap-5 max-w-xl mx-auto text-center items-center">
              <div class="text-accent text-sm tracking-wide">★★★★★</div>
              <p class="text-base text-ink/70">"{{ t.quote }}"</p>
              <div class="flex items-center gap-3">
                <div
                  class="w-11 h-11 rounded-full flex items-center justify-center text-xs font-semibold shrink-0"
                  :class="[t.avatarBg, t.avatarText]"
                >
                  {{ t.initials }}
                </div>
                <div class="text-sm font-semibold">{{ t.name }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        aria-label="Previous testimonial"
        class="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-ink bg-paper flex items-center justify-center hover:bg-ink hover:text-paper transition-colors"
        @click="onPrevClick"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      <button
        aria-label="Next testimonial"
        class="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-ink bg-paper flex items-center justify-center hover:bg-ink hover:text-paper transition-colors"
        @click="onNextClick"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
      </button>

      <div class="flex justify-center gap-2 mt-8">
        <button
          v-for="(t, i) in testimonials"
          :key="t.name"
          :aria-label="`Go to testimonial ${i + 1}`"
          class="w-2 h-2 rounded-full transition-colors"
          :class="i === index ? 'bg-ink' : 'bg-ink/20'"
          @click="onDotClick(i)"
        ></button>
      </div>
    </div>
  </section>
</template>
