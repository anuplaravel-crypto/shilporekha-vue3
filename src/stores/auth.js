import { defineStore } from 'pinia'
import { ref } from 'vue'
import api, { getCsrfCookie } from '@/lib/api'

// Sanctum SPA cookie-session auth. `checked` tracks whether we've asked the
// backend "who am I?" yet this page load, so the router guard only calls
// /api/user once per hard navigation instead of on every guarded route.
export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const checked = ref(false)

  async function register(name, email, password, passwordConfirmation) {
    await getCsrfCookie()
    const { data } = await api.post('/api/register', {
      name,
      email,
      password,
      password_confirmation: passwordConfirmation,
    })
    user.value = data.data
    checked.value = true
    return user.value
  }

  async function login(email, password) {
    await getCsrfCookie()
    const { data } = await api.post('/api/login', { email, password })
    user.value = data.data
    checked.value = true
    return user.value
  }

  async function logout() {
    try {
      await api.post('/api/logout')
    } finally {
      user.value = null
    }
  }

  async function fetchMe() {
    try {
      const { data } = await api.get('/api/user')
      user.value = data.data
    } catch {
      user.value = null
    } finally {
      checked.value = true
    }
  }

  return { user, checked, register, login, logout, fetchMe }
})
