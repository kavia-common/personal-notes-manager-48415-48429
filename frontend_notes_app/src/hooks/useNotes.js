import { useCallback, useEffect, useMemo, useState } from "react";
import { notesApi } from "../utils/apiClient";

/**
 * PUBLIC_INTERFACE
 * useNotes
 * Hook managing notes collection, selected note, filters, and CRUD actions.
 */
export function useNotes() {
  /** This is a public function. */
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(null);
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState({ type: "category", value: "all" }); // all|favorites|archived or type=tag
  const [activeTag, setActiveTag] = useState("");

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      const data = await notesApi.list();
      if (mounted) {
        setNotes(data);
        setLoading(false);
        if (data.length && !selectedId) setSelectedId(data[0].id);
      }
    })();
    return () => { mounted = false; };
  }, []); // eslint-disable-line

  const tags = useMemo(() => {
    const set = new Set();
    notes.forEach(n => (n.tags || []).forEach(t => set.add(t)));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [notes]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return notes.filter(n => {
      // category
      if (activeFilter.type === "category") {
        if (activeFilter.value === "favorites" && !n.favorite) return false;
        if (activeFilter.value === "archived" && !n.archived) return false;
        if (activeFilter.value === "all" && n.archived) return false; // hide archived in All
      }
      // tag
      if (activeFilter.type === "tag") {
        if (!n.tags || !n.tags.includes(activeFilter.value)) return false;
        if (n.archived) return false; // hide archived by default when tag filtering
      }
      // query
      if (q) {
        const hay = `${n.title} ${n.content}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [notes, query, activeFilter]);

  const selected = useMemo(() => notes.find(n => n.id === selectedId) || null, [notes, selectedId]);

  const createNote = useCallback(async () => {
    const created = await notesApi.create({
      title: "Untitled",
      content: "",
      tags: [],
      favorite: false,
      archived: false,
    });
    setNotes(prev => [created, ...prev]);
    setSelectedId(created.id);
  }, []);

  const updateNote = useCallback(async (id, patch) => {
    const updated = await notesApi.update(id, patch);
    if (!updated) return;
    setNotes(prev => prev.map(n => (n.id === id ? updated : n)));
  }, []);

  const deleteNote = useCallback(async (id) => {
    await notesApi.remove(id);
    setNotes(prev => prev.filter(n => n.id !== id));
    setSelectedId(prev => (prev === id && filtered.length ? filtered[0].id : prev === id ? null : prev));
  }, [filtered]);

  const toggleFavorite = useCallback(async (id) => {
    const note = notes.find(n => n.id === id);
    if (!note) return;
    await updateNote(id, { favorite: !note.favorite });
  }, [notes, updateNote]);

  const toggleArchive = useCallback(async (id) => {
    const note = notes.find(n => n.id === id);
    if (!note) return;
    await updateNote(id, { archived: !note.archived, favorite: note.favorite && !note.archived ? false : note.favorite });
  }, [notes, updateNote]);

  const setFilterCategory = useCallback((value) => {
    setActiveFilter({ type: "category", value });
    setActiveTag("");
  }, []);

  const setFilterTag = useCallback((tag) => {
    setActiveFilter({ type: "tag", value: tag });
    setActiveTag(tag);
  }, []);

  return {
    notes,
    tags,
    loading,
    filtered,
    selected,
    selectedId,
    setSelectedId,
    query,
    setQuery,
    activeFilter,
    activeTag,
    createNote,
    updateNote,
    deleteNote,
    toggleFavorite,
    toggleArchive,
    setFilterCategory,
    setFilterTag,
  };
}
