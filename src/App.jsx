import { useEffect, useState } from "react";
import "./App.css";

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

      <div className="form">
        <input 
          type="text" 
          placeholder="Title" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea 
          placeholder="Write your note..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>


        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Work</option>
          <option>Personal</option>
          <option>Study</option>
        </select>

        <button onClick={handleAddNote}>
          {editingId ? "Update Note" : "Add Note"}
        </button>
      </div>

      <input 
        type="text"
        placeholder="Search notes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <select
        value={filterCategory}
        onChange={(e) => setFilterCategory(e.target.value)}
      >
        <option value="All">All</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Study">Study</option>
      </select>

      <div className="note-list">
        {filteredNotes.length === 0 ? (
          <p>No notes yet. Try adding one ✍️</p>
        ) : (
          filteredNotes.map((note) => (
            <div key={note.id} className="note-card">
              <h3>{note.title}</h3>
              <p>{note.content}</p>
              <span className="category">{note.category}</span>

              <div>
                <button onClick={() => handleEdit(note)}>Edit</button>
                <button onClick={() => handleDelete(note.id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
