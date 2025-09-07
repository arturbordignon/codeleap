export const API_BASE = import.meta.env.VITE_BACKEND_URL;

async function http(url, options) {
  const res = await fetch(url, options);

  // Handle 204 (e.g., DELETE)
  if (res.status === 204) return null;

  let data = null;
  const text = await res.text().catch(() => "");
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    // Ignore JSON parse error
  }

  if (!res.ok) {
    const detail =
      (data && (data.detail || data.message)) ||
      (text && text.slice(0, 300)) ||
      `HTTP ${res.status}`;
    throw new Error(detail);
  }

  return data;
}

export const DEFAULT_LIMIT = 10;

export const listPage = (pageUrl = `${API_BASE}?limit=${DEFAULT_LIMIT}`, signal) =>
  http(pageUrl, { signal });

export const listByPage = (page, limit = DEFAULT_LIMIT, signal) => {
  const safeLimit = Math.max(1, Number(limit) || DEFAULT_LIMIT);
  const safePage = Math.max(1, Number(page) || 1);
  const offset = (safePage - 1) * safeLimit;

  const url = `${API_BASE}?limit=${safeLimit}&offset=${offset}`;
  return http(url, { signal });
};

export const createPost = (data, signal) =>
  http(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    signal,
  });

export const patchPost = (id, data, signal) =>
  http(`${API_BASE}${id}/`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    signal,
  });

export const deletePost = (id, signal) =>
  http(`${API_BASE}${id}/`, {
    method: "DELETE",
    signal,
  });
