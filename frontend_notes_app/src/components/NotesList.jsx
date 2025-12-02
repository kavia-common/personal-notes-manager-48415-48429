import React from "react";

/**
 * PUBLIC_INTERFACE
 * NotesList
 * List of notes with basic metadata and selection.
 */
export function NotesList({ notes, selectedId, onSelect, onNew }) {
  /** This is a public function. */
  return (
    <section className="notes-list card" aria-label="Notes list">
      <div className="note-list-header">
        <strong>Notes</strong>
        <button className="btn" onClick={onNew} aria-label="Create note">＋ New</button>
      </div>
      {notes.length === 0 ? (
        <div className="empty-state" aria-live="polite">No notes match the current view.</div>
      ) : (
        notes.map((n) => (
          <article
            key={n.id}
            className={`note-item ${selectedId === n.id ? "active" : ""}`}
            onClick={() => onSelect(n.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && onSelect(n.id)}
            aria-label={`Open note ${n.title || "Untitled"}`}
          >
            <div className="title">
              {n.title || "Untitled"} {n.favorite ? "⭐" : ""} {n.archived ? "🗄️" : ""}
            </div>
            <div className="preview">
              {(n.content || "").slice(0, 120) || "No content yet..."}
            </div>
            <div className="meta">
              <span>{new Date(n.updatedAt).toLocaleString()}</span>
              {n.tags && n.tags.length > 0 && (
                <span aria-label="tags">• {n.tags.map((t) => `#${t}`).join(" ")}</span>
              )}
            </div>
          </article>
        ))
      )}
    </section>
  );
}
