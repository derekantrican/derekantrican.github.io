// Client for the giveaway endpoints on antrican-db (db.derekantrican.com).
// Set REACT_APP_GIVEAWAY_API (e.g. http://localhost:3001) to point at a local server.
export const API_ORIGIN = process.env.REACT_APP_GIVEAWAY_API || 'https://db.derekantrican.com';
const BASE = `${API_ORIGIN}/api/giveaway`;

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export const isValidEmail = email => EMAIL_PATTERN.test((email || '').trim());

export const imageSrc = path => `${API_ORIGIN}${path}`;

async function request(path, { method = 'GET', body, password } = {}) {
  const headers = {};
  if (body !== undefined) headers['Content-Type'] = 'application/json';
  if (password !== undefined) headers['X-Admin-Password'] = password;

  const response = await fetch(`${BASE}${path}`, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  let data = null;
  try { data = await response.json(); } catch { /* empty body */ }
  if (!response.ok) {
    const error = new Error(data?.error || `Request failed (${response.status})`);
    error.status = response.status;
    throw error;
  }
  return data;
}

export const giveawayApi = {
  getItems: () => request('/items'),
  getMine: email => request('/mine', { method: 'POST', body: { email } }),
  reserve: (id, email) => request(`/items/${id}/reserve`, { method: 'POST', body: { email } }),
  unreserve: (id, email) => request(`/items/${id}/unreserve`, { method: 'POST', body: { email } }),

  admin: {
    check: password => request('/admin/check', { password }),
    getItems: password => request('/admin/items', { password }),
    createItem: (password, { image, thumb, description }) =>
      request('/admin/items', { method: 'POST', password, body: { image, thumb, description } }),
    updateItem: (password, id, changes) => request(`/admin/items/${id}`, { method: 'PATCH', password, body: changes }),
    deleteItem: (password, id) => request(`/admin/items/${id}`, { method: 'DELETE', password }),
    removeReservation: (password, id, email) =>
      request(`/admin/items/${id}/unreserve`, { method: 'POST', password, body: { email } }),
  },
};

// localStorage wrappers that never throw (private mode, blocked storage, etc.)
export const storage = {
  get(key) {
    try { return localStorage.getItem(key); } catch { return null; }
  },
  set(key, value) {
    try {
      if (value === null || value === undefined) localStorage.removeItem(key);
      else localStorage.setItem(key, value);
    } catch { /* ignore */ }
  },
};
