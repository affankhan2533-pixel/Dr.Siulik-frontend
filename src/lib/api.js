import { getAdminToken, clearAdminSession } from './adminAuth';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

/**
 * Standard fetch wrapper with auth header
 */
async function request(endpoint, options = {}) {
  const token = getAdminToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  // If body is FormData, delete Content-Type to let browser set boundary
  if (options.body instanceof FormData) {
    delete headers['Content-Type'];
  }

  const url = `${API_BASE}${endpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (response.status === 401) {
      // If unauthorized on a protected route, clear stale session
      if (endpoint.startsWith('/admin') || options.method !== 'GET') {
        clearAdminSession();
      }
    }

    const data = await response.json().catch(() => ({
      success: false,
      message: 'Failed to parse response JSON',
    }));

    if (!response.ok) {
      throw new Error(data.message || `HTTP ${response.status}: Request failed`);
    }

    return data;
  } catch (error) {
    console.warn(`[API] Error on ${endpoint}:`, error.message);
    throw error;
  }
}

// ==========================================
// ADMIN AUTH API
// ==========================================

export async function adminLogin(emailOrUsername, password) {
  return request('/admin/login', {
    method: 'POST',
    body: JSON.stringify({
      email: emailOrUsername,
      username: emailOrUsername,
      password,
    }),
  });
}

export async function verifyAdminMe() {
  return request('/admin/me', {
    method: 'GET',
  });
}

// ==========================================
// MEDIA API
// ==========================================

export async function fetchMedia(section = '') {
  const query = section ? `?section=${encodeURIComponent(section)}` : '';
  return request(`/media${query}`, { method: 'GET' });
}

export async function createMedia(itemData) {
  return request('/media', {
    method: 'POST',
    body: JSON.stringify(itemData),
  });
}

export async function updateMedia(id, itemData) {
  return request(`/media/${id}`, {
    method: 'PUT',
    body: JSON.stringify(itemData),
  });
}

export async function deleteMedia(id) {
  return request(`/media/${id}`, {
    method: 'DELETE',
  });
}

export async function uploadMediaFile(file) {
  const formData = new FormData();
  formData.append('file', file);

  return request('/media/upload', {
    method: 'POST',
    body: formData,
  });
}

// ==========================================
// SERVICES API
// ==========================================

export async function fetchServices() {
  return request('/services', { method: 'GET' });
}

export async function createServiceCategory(categoryData) {
  return request('/services', {
    method: 'POST',
    body: JSON.stringify(categoryData),
  });
}

export async function updateServiceCategory(id, categoryData) {
  return request(`/services/${id}`, {
    method: 'PUT',
    body: JSON.stringify(categoryData),
  });
}

export async function deleteServiceCategory(id) {
  return request(`/services/${id}`, {
    method: 'DELETE',
  });
}

export async function addTreatmentToCategory(categoryId, treatmentData) {
  return request(`/services/${categoryId}/treatments`, {
    method: 'POST',
    body: JSON.stringify(treatmentData),
  });
}

export async function updateTreatmentInCategory(categoryId, treatmentId, treatmentData) {
  return request(`/services/${categoryId}/treatments/${treatmentId}`, {
    method: 'PUT',
    body: JSON.stringify(treatmentData),
  });
}

export async function deleteTreatmentFromCategory(categoryId, treatmentId) {
  return request(`/services/${categoryId}/treatments/${treatmentId}`, {
    method: 'DELETE',
  });
}
