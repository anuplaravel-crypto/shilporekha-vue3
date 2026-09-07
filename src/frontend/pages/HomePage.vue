<script setup>
import Hero from '@/frontend/components/home/sections/Hero.vue'
import ServicesTeaser from '@/frontend/components/home/sections/ServicesTeaser.vue'
import PortfolioTeaser from '@/frontend/components/home/sections/PortfolioTeaser.vue'
import HowItWorks from '@/frontend/components/home/sections/HowItWorks.vue'
import TestimonialCarousel from '@/frontend/components/home/sections/TestimonialCarousel.vue'
import CtaBand from '@/frontend/components/layout/CtaBand.vue'
</script>

<template>
  <Hero />
  <ServicesTeaser />
  <PortfolioTeaser />
  <HowItWorks />
  <TestimonialCarousel />
  <CtaBand heading="Got a design in mind? Let's print it." />
</template>
