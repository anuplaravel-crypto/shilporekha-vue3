import api from '@/lib/api'

// Thin wrappers around the shilporekha-api Service endpoints. Callers get
// back the unwrapped `data` payload (or, for delete, nothing) — the
// {status, message, data} envelope is an API Response Standard detail,
// not something every call site should have to unpack itself.

export function fetchServices() {
  return api.get('/api/services').then((res) => res.data.data)
}

export function fetchService(id) {
  return api.get(`/api/services/${id}`).then((res) => res.data.data)
}

export function createService(payload) {
  return api.post('/api/services', payload).then((res) => res.data.data)
}

export function updateService(id, payload) {
  return api.patch(`/api/services/${id}`, payload).then((res) => res.data.data)
}

export function deleteService(id) {
  return api.delete(`/api/services/${id}`)
}
