// Bootstrap's CSS, BootstrapVueNext's CSS, and Tailwind are all imported
// from main.css using explicit CSS layers, so cascade priority is
// unambiguous instead of depending on import order. Only BootstrapVueNext
// components should be used — never Bootstrap's grid/utility classes
// (.container, .row, .btn, .card, etc.) — Tailwind owns all
// layout/spacing/typography.
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createBootstrap } from 'bootstrap-vue-next'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(createBootstrap())

app.mount('#app')
