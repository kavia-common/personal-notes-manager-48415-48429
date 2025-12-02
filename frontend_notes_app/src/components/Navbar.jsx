import React from "react";

/**
 * PUBLIC_INTERFACE
 * Navbar
 * Top navigation bar with app title and search bar.
 */
export function Navbar({ query, onQueryChange, onNew }) {
  /** This is a public function. */
  return (
    <header className="navbar" role="banner" aria-label="Top navigation">
      <div className="brand" aria-label="Notes brand">
        <span className="dot" aria-hidden="true" />
        Ocean Notes
      </div>

      <label className="search" aria-label="Search notes">
        <span aria-hidden="true">🔎</span>
        <input
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search notes by title or content..."
          aria-label="Search input"
        />
      </label>

      <div className="right-actions" role="group" aria-label="Quick actions">
        <button className="btn primary" onClick={onNew} aria-label="Create new note">
          ＋ New
        </button>
      </div>
    </header>
  );
}
