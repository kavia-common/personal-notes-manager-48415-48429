import React from "react";

/**
 * PUBLIC_INTERFACE
 * Sidebar
 * Sidebar with categories and user tags.
 */
export function Sidebar({ activeFilter, onCategory, tags, onTag }) {
  /** This is a public function. */
  const isActive = (key) =>
    activeFilter.type === "category" && activeFilter.value === key;

  return (
    <aside className="sidebar card" aria-label="Sidebar">
      <div className="section-title">Categories</div>
      <nav className="menu" role="navigation" aria-label="Categories">
        <div
          className={`item ${isActive("all") ? "active" : ""}`}
          onClick={() => onCategory("all")}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && onCategory("all")}
          aria-label="All notes"
        >
          <span>📒</span> All
        </div>
        <div
          className={`item ${isActive("favorites") ? "active" : ""}`}
          onClick={() => onCategory("favorites")}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && onCategory("favorites")}
          aria-label="Favorite notes"
        >
          <span>⭐</span> Favorites
        </div>
        <div
          className={`item ${isActive("archived") ? "active" : ""}`}
          onClick={() => onCategory("archived")}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && onCategory("archived")}
          aria-label="Archived notes"
        >
          <span>🗄️</span> Archived
        </div>
      </nav>

      <div className="section-title" style={{ marginTop: 14 }}>Tags</div>
      <div className="tags" role="list" aria-label="Tags">
        {tags.length === 0 && (
          <span className="helper">No tags yet. Add tags in the editor.</span>
        )}
        {tags.map((t) => (
          <button
            key={t}
            className={`tag-chip ${activeFilter.type === "tag" && activeFilter.value === t ? "active" : ""}`}
            onClick={() => onTag(t)}
            aria-label={`Filter by tag ${t}`}
            title={`Filter by tag ${t}`}
          >
            # {t}
          </button>
        ))}
      </div>
    </aside>
  );
}
