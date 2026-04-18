function NoteCard({ note, handleEdit, handleDelete }) {
  return (
    <div className="note-card">
      <h3>{note.title}</h3>
      <p>{note.content}</p>
      <span className="category">{note.category}</span>

      <div className="actions">
        <button onClick={() => handleEdit(note)}>Edit</button>
        <button onClick={() => handleDelete(note.id)}>Delete</button>
      </div>
    </div>
  );
}

export default NoteCard;