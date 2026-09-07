import axios from 'axios'

// Base URL of the shilporekha-api Laravel backend, e.g. http://localhost:8000
const baseURL = import.meta.env.VITE_API_BASE_URL

const api = axios.create({
  baseURL,
  withCredentials: true, // send the Sanctum session cookie with every request
  withXSRFToken: true, // read the XSRF-TOKEN cookie and send it back as X-XSRF-TOKEN automatically
})

/**
 * Sanctum's SPA auth requires fetching this cookie once (e.g. right before
 * a login request) so the backend can set the CSRF cookie axios then reads.
 * See: https://laravel.com/docs/sanctum#spa-authentication
 */
export function getCsrfCookie() {
  return axios.get(`${baseURL}/sanctum/csrf-cookie`, { withCredentials: true })
}

export default api
