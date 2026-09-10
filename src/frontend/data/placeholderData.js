// Temporary local placeholder data.
// Once the API integration phase starts, each page swaps its use of these
// arrays for an axios call to shilporekha-api instead — the shape here is
// deliberately close to what the real API/DB models will return.
//
// Note: services are no longer placeholder data — see src/stores/services.js,
// which fetches the real catalog from shilporekha-api.

export const featuredPortfolioItems = [
  { id: 1, title: 'Neon Wave Tee', category: 'Streetwear', mockup: 'wave' },
  { id: 2, title: 'Static Noise Tour Tee', category: 'Bands & Music', mockup: 'static' },
  { id: 3, title: 'Bold Type Manifesto', category: 'Typography', mockup: 'type' },
]

export const portfolioItems = [
  {
    id: 1,
    title: 'Neon Wave Tee',
    category: 'streetwear',
    categoryLabel: 'Streetwear',
    image: 'https://placehold.co/500x500/0a0a0a/faf9f6?font=montserrat&text=NEON+WAVE+TEE',
  },
  {
    id: 2,
    title: 'Retro Sunset Ride',
    category: 'illustration',
    categoryLabel: 'Illustration',
    image: 'https://placehold.co/500x500/ff4d2e/0a0a0a?font=montserrat&text=RETRO+SUNSET+RIDE',
  },
  {
    id: 3,
    title: 'Static Noise Tour Tee',
    category: 'music',
    categoryLabel: 'Bands & Music',
    image: 'https://placehold.co/500x500/e5e2da/0a0a0a?font=montserrat&text=STATIC+NOISE+TOUR',
  },
  {
    id: 4,
    title: 'Bold Type Manifesto',
    category: 'typography',
    categoryLabel: 'Typography',
    image: 'https://placehold.co/500x500/0a0a0a/faf9f6?font=montserrat&text=BOLD+TYPE+MANIFESTO',
  },
  {
    id: 5,
    title: 'Desert Bloom Botanical',
    category: 'illustration',
    categoryLabel: 'Illustration',
    image: 'https://placehold.co/500x500/e5e2da/0a0a0a?font=montserrat&text=DESERT+BLOOM',
  },
  {
    id: 6,
    title: 'Concrete Jungle',
    category: 'streetwear',
    categoryLabel: 'Streetwear',
    image: 'https://placehold.co/500x500/ff4d2e/0a0a0a?font=montserrat&text=CONCRETE+JUNGLE',
  },
  {
    id: 7,
    title: 'Analog Static EP Tee',
    category: 'music',
    categoryLabel: 'Bands & Music',
    image: 'https://placehold.co/500x500/0a0a0a/faf9f6?font=montserrat&text=ANALOG+STATIC+EP',
  },
  {
    id: 8,
    title: 'Minimal Grid Type',
    category: 'typography',
    categoryLabel: 'Typography',
    image: 'https://placehold.co/500x500/e5e2da/0a0a0a?font=montserrat&text=MINIMAL+GRID+TYPE',
  },
  {
    id: 9,
    title: 'Wild Coyote Crew',
    category: 'streetwear',
    categoryLabel: 'Streetwear',
    image: 'https://placehold.co/500x500/ff4d2e/0a0a0a?font=montserrat&text=WILD+COYOTE+CREW',
  },
]

export const portfolioFilters = [
  { value: 'all', label: 'All' },
  { value: 'streetwear', label: 'Streetwear' },
  { value: 'music', label: 'Bands & Music' },
  { value: 'typography', label: 'Typography' },
  { value: 'illustration', label: 'Illustration' },
]

export const packages = [
  {
    name: 'Basic',
    price: 79,
    mostPopular: false,
    features: ['1 initial concept', '1 revision round', 'Print-ready vector file'],
  },
  {
    name: 'Standard',
    price: 149,
    mostPopular: true,
    features: [
      '3 initial concepts',
      '3 revision rounds',
      'Print-ready + mockup files',
      'Editable source file',
    ],
  },
  {
    name: 'Premium',
    price: 299,
    mostPopular: false,
    features: [
      'Unlimited concepts',
      'Unlimited revisions',
      'All file formats included',
      'Rush delivery available (48h)',
    ],
  },
]

export const faqs = [
  {
    question: 'What file formats do I get?',
    answer: 'Vector source (AI/EPS), a print-ready PDF, and PNG mockups for your store or socials.',
  },
  {
    question: 'How many revisions are included?',
    answer:
      'That depends on the package — see the revision count listed on each tier above. Extra rounds can be added for a small fee.',
  },
  {
    question: 'Can I order more than one design?',
    answer:
      'Yes — bundle discounts are available for multi-design orders. Mention it in your project brief.',
  },
]

export const testimonials = [
  {
    initials: 'JB',
    quote:
      "Nailed our brand's edge on the first draft. The final print files were flawless — no back and forth with the printer at all.",
    name: 'Jordan Blake — Ratio Streetwear',
    avatarBg: 'bg-ink',
    avatarText: 'text-paper',
  },
  {
    initials: 'PN',
    quote:
      'Turned our tour poster idea into a tee design fans actually wanted to buy. Fast turnaround, great communication.',
    name: 'Priya Nair — The Night Shift',
    avatarBg: 'bg-accent',
    avatarText: 'text-ink',
  },
  {
    initials: 'MW',
    quote:
      'Delivered three concepts in two days, and the final vector files dropped straight into our print software with zero fixes needed.',
    name: 'Marcus Webb — Elevation Apparel Co.',
    avatarBg: 'bg-ink',
    avatarText: 'text-paper',
  },
]
