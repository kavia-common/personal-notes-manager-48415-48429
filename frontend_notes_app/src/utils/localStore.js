const KEY = "notes.v1";

/**
 * Reads the notes array from localStorage.
 */
function read() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/**
 * Writes the notes array to localStorage.
 */
function write(notes) {
  try {
    localStorage.setItem(KEY, JSON.stringify(notes));
  } catch {
    // ignore quota errors
  }
}

/**
 * Generates a simple unique id.
 */
function uid() {
  return `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

/**
 * PUBLIC_INTERFACE
 * localStore
 * Local storage backed CRUD implementation for notes.
 */
export const localStore = {
  /** This is a public function. */
  list() {
    return read();
  },

  /** This is a public function. */
  create(note) {
    const now = new Date().toISOString();
    const newNote = {
      id: uid(),
      title: note.title || "Untitled",
      content: note.content || "",
      tags: Array.isArray(note.tags) ? note.tags : [],
      favorite: !!note.favorite,
      archived: !!note.archived,
      createdAt: now,
      updatedAt: now,
    };
    const notes = read();
    notes.unshift(newNote);
    write(notes);
    return newNote;
  },

  /** This is a public function. */
  update(id, patch) {
    const notes = read();
    const idx = notes.findIndex(n => n.id === id);
    if (idx === -1) return null;
    const updated = { ...notes[idx], ...patch, updatedAt: new Date().toISOString() };
    notes[idx] = updated;
    write(notes);
    return updated;
  },

  /** This is a public function. */
  remove(id) {
    const notes = read();
    const next = notes.filter(n => n.id !== id);
    write(next);
    return { ok: true };
  },
};
