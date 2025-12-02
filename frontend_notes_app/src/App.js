import React from "react";
import "./styles/theme.css";
import "./App.css"; // keep existing for baseline, though theme.css provides the new theme
import { Navbar } from "./components/Navbar";
import { Sidebar } from "./components/Sidebar";
import { NotesList } from "./components/NotesList";
import { NoteEditor } from "./components/NoteEditor";
import { EmptyState } from "./components/EmptyState";
import { useNotes } from "./hooks/useNotes";

/**
 * PUBLIC_INTERFACE
 * App
 * Notes application entry component with top navbar, sidebar, list, and editor.
 */
function App() {
  /** This is a public function. */
  const {
    filtered,
    selected,
    selectedId,
    setSelectedId,
    query,
    setQuery,
    activeFilter,
    setFilterCategory,
    tags,
    setFilterTag,
    createNote,
    updateNote,
    deleteNote,
    toggleFavorite,
    toggleArchive,
    loading,
  } = useNotes();

  return (
    <div className="app">
      <Navbar query={query} onQueryChange={setQuery} onNew={createNote} />
      <div className="container">
        <Sidebar
          activeFilter={activeFilter}
          onCategory={setFilterCategory}
          tags={tags}
          onTag={setFilterTag}
        />
        <main className="main" role="main">
          <NotesList
            notes={filtered}
            selectedId={selectedId}
            onSelect={setSelectedId}
            onNew={createNote}
          />
          <div className="card" style={{ padding: 0 }}>
            {loading ? (
              <div className="empty-state" aria-live="polite">Loading...</div>
            ) : selected ? (
              <NoteEditor
                note={selected}
                onChange={updateNote}
                onDelete={deleteNote}
                onToggleFav={toggleFavorite}
                onToggleArchive={toggleArchive}
              />
            ) : (
              <EmptyState onNew={createNote} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
