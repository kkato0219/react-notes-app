import { useEffect, useState } from "react";
import "./App.css";

import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";
import NoteControls from "./components/NoteControls";

function App() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Work");
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes");

    if (savedNotes) {
      return JSON.parse(savedNotes);
    }

    return [];
  });


  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  function handleAddNote() {
    if (!title || !content) {
      alert("Please fill in title and content.");
      return;
    }

    if (editingId) {
      const updatedNotes = notes.map((note) =>
        note.id === editingId
          ? { ...note, title, content, category }
          : note
      );

      setNotes(updatedNotes);
      setEditingId(null);
    } else {
      const newNote = {
        id: Date.now(),
        title,
        content,
        category,
      };

      setNotes([...notes, newNote]);
    }

    setTitle("");
    setContent("");
    setCategory("Work");
  }

  function handleDelete(id) {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
  }

  function handleEdit(note) {
    setTitle(note.title);
    setContent(note.content);
    setCategory(note.category);
    setEditingId(note.id);
  }

  const filteredNotes = notes.filter((note) => { 
    const matchesSearch =
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      filterCategory === "All" || note.category === filterCategory;

      return matchesSearch && matchesCategory;
  });

  return (
    <div className="container">
      <h1>Notes App</h1>

      <NoteForm
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        category={category}
        setCategory={setCategory}
        handleAddNote={handleAddNote}
        editingId={editingId}
      />

      <NoteControls
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}
      />

      <NoteList
        filteredNotes={filteredNotes}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
}

export default App;
