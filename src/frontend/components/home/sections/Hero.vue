<script setup></script>

<template>
  <section class="max-w-6xl mx-auto px-6 pt-16 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
    <div class="flex flex-col gap-6">
      <span class="inline-block w-fit text-xs uppercase tracking-[0.2em] font-semibold text-accent border border-accent px-3 py-1">Now booking — T-Shirt Design</span>
      <h1 class="font-display text-5xl sm:text-6xl leading-[0.95] text-offset">Bold graphics<br>for shirts that<br>get noticed.</h1>
      <p class="text-base text-ink/70 max-w-md">Custom t-shirt graphic design for streetwear brands, bands, and small businesses — from first sketch to print-ready file.</p>
      <div class="flex flex-wrap gap-4 mt-2">
        <RouterLink :to="{ name: 'contact' }" class="bg-ink text-paper text-sm uppercase tracking-wide font-semibold px-7 py-4 hover:bg-accent transition-colors">Start a Project →</RouterLink>
        <RouterLink :to="{ name: 'portfolio' }" class="border border-ink text-sm uppercase tracking-wide font-semibold px-7 py-4 hover:border-accent hover:text-accent transition-colors">View Portfolio</RouterLink>
      </div>
    </div>
    <div class="relative">
      <div class="absolute -top-4 -left-4 w-full h-full bg-ink hidden sm:block"></div>
      <svg viewBox="0 0 400 400" role="img" aria-label="Illustrated mockup of a t-shirt printed with a Cotton &amp; Ink sunburst design" class="relative w-full aspect-square border border-ink" style="background:#e5e2da;">
        <path d="M133,58 C133,33 155,18 183,18 Q200,38 217,18 C245,18 267,33 267,58 L305,30 L360,95 L312,148 L285,120 L285,378 L115,378 L115,120 L88,148 L40,95 L95,30 Z" fill="#0a0a0a"/>
        <path d="M183,18 Q200,38 217,18" fill="none" stroke="#2a2a28" stroke-width="4" stroke-linecap="round"/>
        <g transform="translate(200,195)">
          <polygon points="0,-58 15,-15 58,0 15,15 0,58 -15,15 -58,0 -15,-15" fill="#ff4d2e"/>
          <circle r="17" fill="#e5e2da"/>
        </g>
        <text x="200" y="298" text-anchor="middle" font-family="Anton, sans-serif" font-size="27" fill="#faf9f6" letter-spacing="1">COTTON &amp; INK</text>
        <text x="200" y="317" text-anchor="middle" font-family="'IBM Plex Sans', sans-serif" font-size="9" letter-spacing="3" fill="#ff4d2e">GRAPHIC DESIGN STUDIO</text>
      </svg>
    </div>
  </section>
</template>
