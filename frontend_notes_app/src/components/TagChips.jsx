import React, { useState } from "react";

/**
 * PUBLIC_INTERFACE
 * TagChips
 * Allows adding and removing tags for a note.
 */
export function TagChips({ tags, onChange }) {
  /** This is a public function. */
  const [input, setInput] = useState("");

  const addTag = (tag) => {
    const t = (tag || "").trim();
    if (!t) return;
    const next = Array.from(new Set([...(tags || []), t]));
    onChange(next);
    setInput("");
  };

  const removeTag = (t) => {
    onChange((tags || []).filter((x) => x !== t));
  };

  const handleKey = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(input);
    } else if (e.key === "Backspace" && !input && (tags || []).length) {
      removeTag(tags[tags.length - 1]);
    }
  };

  return (
    <div>
      <div className="tags" aria-label="Note tags">
        {(tags || []).map((t) => (
          <span key={t} className="tag-chip" title="Click to remove tag">
            #{t}
            <button
              className="btn"
              style={{ padding: "2px 6px", marginLeft: 6 }}
              aria-label={`Remove tag ${t}`}
              onClick={() => removeTag(t)}
            >
              ×
            </button>
          </span>
        ))}
      </div>
      <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
        <input
          className="input"
          placeholder="Add a tag and press Enter"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          aria-label="Add tag input"
        />
        <button className="btn" onClick={() => addTag(input)} aria-label="Add tag">Add</button>
      </div>
      <div className="helper" style={{ marginTop: 6 }}>
        Tips: Press Enter or comma to add tags. Click × to remove.
      </div>
    </div>
  );
}
