// Temporary local placeholder data for the admin panel — mirrors
// src/frontend/data/placeholderData.js. Swapped for axios calls into
// shilporekha-api once the API integration phase starts.
//
// Note: services are no longer placeholder data — see src/stores/services.js,
// which fetches the real catalog from shilporekha-api.

export const portfolioSubcategoryFilters = [
  { value: 'all', label: 'All Subcategories' },
  { value: 'outdoor-adventure', label: 'Outdoor Adventure' },
  { value: 'fishing', label: 'Fishing' },
  { value: 'camping', label: 'Camping' },
  { value: 'hiking', label: 'Hiking' },
  { value: 'hunting', label: 'Hunting' },
  { value: 'motorsports', label: 'Motorsports' },
  { value: 'western', label: 'Western' },
  { value: 'fitness', label: 'Fitness' },
  { value: 'typography', label: 'Typography' },
  { value: 'vintage-retro', label: 'Vintage / Retro' },
]

export const portfolioItems = [
  {
    id: 1,
    title: 'Neon Wave Tee',
    subcategory: 'motorsports',
    subcategoryLabel: 'Motorsports',
    image: 'https://placehold.co/400x300/0a0a0a/faf9f6?font=montserrat&text=NEON+WAVE',
    featured: true,
  },
  {
    id: 2,
    title: 'Retro Sunset Ride',
    subcategory: 'vintage-retro',
    subcategoryLabel: 'Vintage / Retro',
    image: 'https://placehold.co/400x300/ff4d2e/0a0a0a?font=montserrat&text=RETRO+SUNSET',
    featured: false,
  },
  {
    id: 3,
    title: 'Static Noise Tour Tee',
    subcategory: 'fitness',
    subcategoryLabel: 'Fitness',
    image: 'https://placehold.co/400x300/e5e2da/0a0a0a?font=montserrat&text=STATIC+NOISE',
    featured: false,
  },
  {
    id: 4,
    title: 'Bold Type Manifesto',
    subcategory: 'typography',
    subcategoryLabel: 'Typography',
    image: 'https://placehold.co/400x300/0a0a0a/faf9f6?font=montserrat&text=BOLD+TYPE',
    featured: true,
  },
  {
    id: 5,
    title: 'Desert Bloom Botanical',
    subcategory: 'camping',
    subcategoryLabel: 'Camping',
    image: 'https://placehold.co/400x300/e5e2da/0a0a0a?font=montserrat&text=DESERT+BLOOM',
    featured: false,
  },
  {
    id: 6,
    title: 'Concrete Jungle',
    subcategory: 'outdoor-adventure',
    subcategoryLabel: 'Outdoor Adventure',
    image: 'https://placehold.co/400x300/ff4d2e/0a0a0a?font=montserrat&text=CONCRETE+JUNGLE',
    featured: false,
  },
  {
    id: 7,
    title: 'Analog Static EP Tee',
    subcategory: 'hiking',
    subcategoryLabel: 'Hiking',
    image: 'https://placehold.co/400x300/0a0a0a/faf9f6?font=montserrat&text=ANALOG+STATIC',
    featured: false,
  },
  {
    id: 8,
    title: 'Minimal Grid Type',
    subcategory: 'typography',
    subcategoryLabel: 'Typography',
    image: 'https://placehold.co/400x300/e5e2da/0a0a0a?font=montserrat&text=MINIMAL+GRID',
    featured: false,
  },
  {
    id: 9,
    title: 'Wild Coyote Crew',
    subcategory: 'hunting',
    subcategoryLabel: 'Hunting',
    image: 'https://placehold.co/400x300/ff4d2e/0a0a0a?font=montserrat&text=WILD+COYOTE',
    featured: false,
  },
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
      'Rush delivery (48h)',
    ],
  },
]

export const statusMeta = {
  new: { label: 'New', dotClass: 'bg-accent', badgeClass: 'bg-accent/10 text-accent' },
  in_progress: { label: 'In Progress', dotClass: 'bg-ink/40', badgeClass: 'bg-ink/5 text-ink/70' },
  completed: {
    label: 'Completed',
    dotClass: 'bg-green-500',
    badgeClass: 'bg-green-50 text-green-700',
  },
  cancelled: {
    label: 'Cancelled',
    dotClass: 'bg-gray-300',
    badgeClass: 'bg-gray-100 text-gray-400',
  },
}

export const orders = [
  {
    id: 142,
    name: 'Jordan Blake',
    email: 'jordan@ratio.co',
    service: 'T-Shirt Design',
    budget: '$100–250',
    status: 'new',
    date: 'Sep 6',
    timeline: 'Needed by Oct 15',
    submitted: 'Sep 6, 2026',
    description:
      "Looking for a bold streetwear graphic for our next drop — something that fits our brand's edge, similar to the Neon Wave piece in the portfolio.",
    attachments: [{ name: 'ref-01.jpg' }, { name: 'moodboard.pdf' }],
  },
  {
    id: 141,
    name: 'Priya Nair',
    email: 'priya@nightshift.fm',
    service: 'T-Shirt Design',
    budget: '$250–500',
    status: 'in_progress',
    date: 'Sep 5',
    timeline: 'Needed by Oct 1',
    submitted: 'Sep 5, 2026',
    description:
      'Turning our tour poster into a tee design fans will actually want to buy — similar energy to the Static Noise piece.',
    attachments: [{ name: 'tour-poster.png' }],
  },
  {
    id: 140,
    name: 'Marcus Webb',
    email: 'marcus@elevation.co',
    service: 'T-Shirt Design',
    budget: '$500+',
    status: 'completed',
    date: 'Sep 2',
    timeline: 'Needed by Sep 10',
    submitted: 'Aug 30, 2026',
    description: 'Three concepts for our fall drop, final vector files for our print shop.',
    attachments: [],
  },
  {
    id: 139,
    name: 'Dana Ruiz',
    email: 'dana@wildcrew.co',
    service: 'T-Shirt Design',
    budget: 'Under $100',
    status: 'cancelled',
    date: 'Aug 29',
    timeline: '—',
    submitted: 'Aug 27, 2026',
    description: 'Simple wordmark tee, cancelled by client before draft stage.',
    attachments: [],
  },
  {
    id: 138,
    name: 'Sam Okoye',
    email: 'sam@coyotecrew.co',
    service: 'T-Shirt Design',
    budget: '$100–250',
    status: 'new',
    date: 'Aug 28',
    timeline: 'Needed by Sep 20',
    submitted: 'Aug 28, 2026',
    description:
      'Coyote crew graphic, similar treatment to the Wild Coyote Crew piece in the portfolio.',
    attachments: [{ name: 'crew-logo-ref.png' }],
  },
]

export const testimonials = [
  {
    name: 'Jordan Blake',
    company: 'Ratio Streetwear',
    quote: "Nailed our brand's edge on the first draft...",
    rating: 5,
    featured: true,
  },
  {
    name: 'Priya Nair',
    company: 'The Night Shift',
    quote: 'Turned our tour poster idea into a tee design...',
    rating: 5,
    featured: false,
  },
  {
    name: 'Marcus Webb',
    company: 'Elevation Apparel Co.',
    quote: 'Delivered three concepts in two days...',
    rating: 5,
    featured: true,
  },
]

export const siteSettings = {
  siteName: 'Cotton & Ink',
  tagline: 'Graphic Design Studio',
  contactEmail: 'hello@cottonandink.studio',
  instagramUrl: '',
  behanceUrl: '',
  dribbbleUrl: '',
}
