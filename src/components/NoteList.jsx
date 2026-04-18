import NoteCard from "./NoteCard";

function NoteList({ filteredNotes, handleEdit, handleDelete }) {
  return (
    <div className="notes-list">
      {filteredNotes.length === 0 ? (
        <p>No notes found. Try adding one ✍️</p>
      ) : (
        filteredNotes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        ))
      )}
    </div>
  );
}

export default NoteList;