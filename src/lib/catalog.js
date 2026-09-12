import api from '@/lib/api'

// Thin wrappers around the shilporekha-api product-catalog endpoints
// (Category -> Subcategory -> Product, plus the global Style lookup).
// Same shape as lib/services.js: callers get back the unwrapped `data`
// payload rather than the {status, message, data} envelope.

// --- Categories --------------------------------------------------------

export function fetchCategories(serviceId) {
  return api
    .get('/api/categories', { params: { service_id: serviceId } })
    .then((res) => res.data.data)
}

export function createCategory(payload) {
  return api.post('/api/categories', payload).then((res) => res.data.data)
}

export function updateCategory(id, payload) {
  return api.patch(`/api/categories/${id}`, payload).then((res) => res.data.data)
}

export function deleteCategory(id) {
  return api.delete(`/api/categories/${id}`)
}

// --- Subcategories -------------------------------------------------------

export function fetchSubcategories(categoryId) {
  return api
    .get('/api/subcategories', { params: { category_id: categoryId } })
    .then((res) => res.data.data)
}

export function createSubcategory(payload) {
  return api.post('/api/subcategories', payload).then((res) => res.data.data)
}

export function updateSubcategory(id, payload) {
  return api.patch(`/api/subcategories/${id}`, payload).then((res) => res.data.data)
}

export function deleteSubcategory(id) {
  return api.delete(`/api/subcategories/${id}`)
}

// --- Styles --------------------------------------------------------------

export function fetchStyles() {
  return api.get('/api/styles').then((res) => res.data.data)
}

export function createStyle(payload) {
  return api.post('/api/styles', payload).then((res) => res.data.data)
}

export function updateStyle(id, payload) {
  return api.patch(`/api/styles/${id}`, payload).then((res) => res.data.data)
}

export function deleteStyle(id) {
  return api.delete(`/api/styles/${id}`)
}

// --- Products --------------------------------------------------------------

export function fetchProducts(filters = {}) {
  return api.get('/api/products', { params: filters }).then((res) => res.data.data)
}

export function createProduct(formData) {
  return api.post('/api/products', formData).then((res) => res.data.data)
}

/**
 * Products can carry a real image upload, and a real PUT/PATCH request
 * can't have a multipart body (PHP/browsers don't parse it) — so updates
 * go through POST with Laravel's `_method` spoofing instead.
 */
export function updateProduct(id, formData) {
  formData.append('_method', 'PUT')

  return api.post(`/api/products/${id}`, formData).then((res) => res.data.data)
}

export function deleteProduct(id) {
  return api.delete(`/api/products/${id}`)
}
