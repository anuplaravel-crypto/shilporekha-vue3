import './assets/main.css'

// Bootstrap's own CSS (Reboot + component styles) and BootstrapVueNext's
// supplementary component styles. Only BootstrapVueNext components should
// be used from these — never Bootstrap's grid/utility classes (.container,
// .row, .btn, .card, etc.) — Tailwind owns all layout/spacing/typography.
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'

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
