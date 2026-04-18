function NoteControls({
  searchTerm,
  setSearchTerm,
  filterCategory,
  setFilterCategory,
}) {
  return (
    <div className="controls">
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
    </div>
  );
}

export default NoteControls;