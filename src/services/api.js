const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5001/api";

async function request(path, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || `Request failed (${res.status})`);
  }
  return data;
}

export function apiGet(path, token) {
  return request(path, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
}

export function apiPost(path, body, token) {
  return request(path, {
    method: "POST",
    body: JSON.stringify(body),
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
}

export function apiPut(path, body, token) {
  return request(path, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
}

export function apiPatch(path, body, token) {
  return request(path, {
    method: "PATCH",
    body: JSON.stringify(body),
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
}

export async function checkApiHealth() {
  try {
    const res = await fetch(`${API_BASE}/health`);
    const data = await res.json().catch(() => ({}));
    if (data.ok === true) return { ok: true };
    if (data.database === "disconnected") return { ok: false, reason: "database" };
    return { ok: false, reason: "api" };
  } catch {
    return { ok: false, reason: "network" };
  }
}

export { API_BASE };
