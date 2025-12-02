import React, { useEffect, useState } from "react";
import { TagChips } from "./TagChips";

/**
 * PUBLIC_INTERFACE
 * NoteEditor
 * Editor for a single selected note.
 */
export function NoteEditor({ note, onChange, onDelete, onToggleFav, onToggleArchive }) {
  /** This is a public function. */
  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");
  const [tags, setTags] = useState(note?.tags || []);

  useEffect(() => {
    setTitle(note?.title || "");
    setContent(note?.content || "");
    setTags(note?.tags || []);
  }, [note?.id]); // eslint-disable-line

  useEffect(() => {
    if (!note) return;
    const next = { title, content, tags };
    const timeout = setTimeout(() => onChange(note.id, next), 250);
    return () => clearTimeout(timeout);
  }, [title, content, tags, note, onChange]);

  if (!note) return null;

  return (
    <section className="editor card" aria-label="Note editor">
      <div className="toolbar" role="toolbar">
        <button className={`btn ${note.favorite ? "warn" : ""}`} onClick={() => onToggleFav(note.id)} aria-label="Toggle favorite">
          {note.favorite ? "★ Favorited" : "☆ Favorite"}
        </button>
        <button className="btn" onClick={() => onToggleArchive(note.id)} aria-label="Toggle archive">
          {note.archived ? "Unarchive" : "Archive"}
        </button>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          <button className="btn error" onClick={() => onDelete(note.id)} aria-label="Delete note">
            Delete
          </button>
        </div>
      </div>
      <div className="content">
        <input
          className="input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note title"
          aria-label="Note title"
        />
        <textarea
          className="textarea"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your note here..."
          aria-label="Note content"
        />
        <div>
          <div className="helper" style={{ marginBottom: 6 }}>Tags</div>
          <TagChips tags={tags} onChange={setTags} />
        </div>
      </div>
    </section>
  );
}
