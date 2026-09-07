<script setup></script>

<template>
  <section class="max-w-6xl mx-auto px-6 py-16 border-t border-ink/10">
    <div class="flex flex-wrap justify-between items-end gap-4 mb-10">
      <h2 class="font-display text-3xl">Recent Work</h2>
      <RouterLink :to="{ name: 'portfolio' }" class="text-sm uppercase tracking-wide font-semibold hover:text-accent">Full Portfolio →</RouterLink>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-5">
      <RouterLink :to="{ name: 'portfolio' }" class="card-hover block border border-ink group">
        <svg viewBox="0 0 400 400" role="img" aria-label="Neon Wave Tee — orange wave stripes on a black t-shirt" class="w-full aspect-square" style="background:#0a0a0a;">
          <path d="M133,58 C133,33 155,18 183,18 Q200,38 217,18 C245,18 267,33 267,58 L305,30 L360,95 L312,148 L285,120 L285,378 L115,378 L115,120 L88,148 L40,95 L95,30 Z" fill="#faf9f6"/>
          <path d="M183,18 Q200,38 217,18" fill="none" stroke="#d8d5cc" stroke-width="4" stroke-linecap="round"/>
          <g stroke="#ff4d2e" stroke-width="9" fill="none" stroke-linecap="round">
            <path d="M148,175 Q170,158 192,175 T236,175 T252,175"/>
            <path d="M148,205 Q170,188 192,205 T236,205 T252,205"/>
            <path d="M148,235 Q170,218 192,235 T236,235 T252,235"/>
          </g>
          <text x="200" y="285" text-anchor="middle" font-family="Anton, sans-serif" font-size="24" fill="#0a0a0a" letter-spacing="1">WAVE</text>
        </svg>
        <div class="p-4">
          <div class="text-sm font-semibold">Neon Wave Tee</div>
          <div class="text-xs text-ink/50 uppercase tracking-wide">Streetwear</div>
        </div>
      </RouterLink>

      <RouterLink :to="{ name: 'portfolio' }" class="card-hover block border border-ink group">
        <svg viewBox="0 0 400 400" role="img" aria-label="Static Noise Tour Tee — white lightning bolt on a black t-shirt with tour text" class="w-full aspect-square" style="background:#ff4d2e;">
          <path d="M133,58 C133,33 155,18 183,18 Q200,38 217,18 C245,18 267,33 267,58 L305,30 L360,95 L312,148 L285,120 L285,378 L115,378 L115,120 L88,148 L40,95 L95,30 Z" fill="#0a0a0a"/>
          <path d="M183,18 Q200,38 217,18" fill="none" stroke="#2a2a28" stroke-width="4" stroke-linecap="round"/>
          <polygon points="215,150 168,222 196,222 182,268 235,196 204,196" fill="#faf9f6"/>
          <text x="200" y="300" text-anchor="middle" font-family="Anton, sans-serif" font-size="18" fill="#faf9f6" letter-spacing="1">STATIC NOISE</text>
          <text x="200" y="316" text-anchor="middle" font-family="'IBM Plex Sans', sans-serif" font-size="9" letter-spacing="3" fill="#ff4d2e">TOUR — 2026</text>
        </svg>
        <div class="p-4">
          <div class="text-sm font-semibold">Static Noise Tour Tee</div>
          <div class="text-xs text-ink/50 uppercase tracking-wide">Bands &amp; Music</div>
        </div>
      </RouterLink>

      <RouterLink :to="{ name: 'portfolio' }" class="card-hover block border border-ink group">
        <svg viewBox="0 0 400 400" role="img" aria-label="Bold Type Manifesto — stacked bold typography on a white t-shirt" class="w-full aspect-square" style="background:#e5e2da;">
          <path d="M133,58 C133,33 155,18 183,18 Q200,38 217,18 C245,18 267,33 267,58 L305,30 L360,95 L312,148 L285,120 L285,378 L115,378 L115,120 L88,148 L40,95 L95,30 Z" fill="#faf9f6" stroke="#0a0a0a" stroke-width="2"/>
          <path d="M183,18 Q200,38 217,18" fill="none" stroke="#d8d5cc" stroke-width="4" stroke-linecap="round"/>
          <text x="200" y="205" text-anchor="middle" font-family="Anton, sans-serif" font-size="46" fill="#0a0a0a" letter-spacing="1">BOLD</text>
          <text x="200" y="252" text-anchor="middle" font-family="Anton, sans-serif" font-size="46" fill="#0a0a0a" letter-spacing="1">TYPE</text>
          <rect x="155" y="266" width="90" height="6" fill="#ff4d2e"/>
        </svg>
        <div class="p-4">
          <div class="text-sm font-semibold">Bold Type Manifesto</div>
          <div class="text-xs text-ink/50 uppercase tracking-wide">Typography</div>
        </div>
      </RouterLink>
    </div>
  </section>
</template>
