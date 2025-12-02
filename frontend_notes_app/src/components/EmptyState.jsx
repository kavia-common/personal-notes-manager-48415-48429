import React from "react";

/**
 * PUBLIC_INTERFACE
 * EmptyState
 * Simple empty placeholder component.
 */
export function EmptyState({ onNew }) {
  /** This is a public function. */
  return (
    <div className="empty-state" role="status" aria-live="polite">
      <div style={{ fontSize: 42, marginBottom: 8 }}>📒</div>
      <div style={{ fontWeight: 600, marginBottom: 6 }}>No note selected</div>
      <div className="helper" style={{ marginBottom: 12 }}>
        Create a new note to get started.
      </div>
      <button className="btn primary" onClick={onNew} aria-label="Create new note">
        ＋ New note
      </button>
    </div>
  );
}
