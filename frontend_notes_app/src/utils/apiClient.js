import { getConfig, isBackendEnabled } from "./env";
import { localStore } from "./localStore";

const cfg = getConfig();
const base = cfg.apiBase || cfg.backendUrl || "";

/**
 * Internal helper to fetch with graceful failure.
 */
async function safeFetch(path, options = {}) {
  const url = `${base}${path}`;
  try {
    const res = await fetch(url, {
      headers: { "Content-Type": "application/json", ...(options.headers || {}) },
      ...options,
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    // If backend fails or is absent, propagate null to fall back to local store
    return null;
  }
}

/**
 * PUBLIC_INTERFACE
 * notesApi
 * Thin API client with localStorage fallback when backend is not available.
 */
export const notesApi = {
  /** This is a public function. */
  async list() {
    if (isBackendEnabled()) {
      const data = await safeFetch("/api/notes", { method: "GET" });
      if (Array.isArray(data)) return data;
    }
    return localStore.list();
  },

  /** This is a public function. */
  async create(note) {
    if (isBackendEnabled()) {
      const data = await safeFetch("/api/notes", {
        method: "POST",
        body: JSON.stringify(note),
      });
      if (data) return data;
    }
    return localStore.create(note);
  },

  /** This is a public function. */
  async update(id, patch) {
    if (isBackendEnabled()) {
      const data = await safeFetch(`/api/notes/${id}`, {
        method: "PUT",
        body: JSON.stringify(patch),
      });
      if (data) return data;
    }
    return localStore.update(id, patch);
  },

  /** This is a public function. */
  async remove(id) {
    if (isBackendEnabled()) {
      const data = await safeFetch(`/api/notes/${id}`, { method: "DELETE" });
      if (data) return data;
    }
    return localStore.remove(id);
  },
};
