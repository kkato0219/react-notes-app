function NoteForm({
    title,
    setTitle,
    content,
    setContent,
    category,
    setCategory,
    handleAddNote,
    editingId,
}) {
    return (
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
    );   
}

export default NoteForm;