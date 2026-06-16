import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import alertContext from '../context/alert/alertContext';
import Noteitem from './Noteitem';
import AddNotes from './AddNotes';
import './Notes.css';

const TAGS = ['All', 'Personal', 'Work', 'Ideas', 'Todo', 'Important', 'General'];

const Notes = () => {
  const { notes, getNotes, editNote } = useContext(noteContext);
  const { showAlert }                 = useContext(alertContext);

  const [eNote,    setENote]    = useState({ id: '', etitle: '', edescription: '', etag: '' });
  const [search,   setSearch]   = useState('');
  const [filter,   setFilter]   = useState('All');
  const [loading,  setLoading]  = useState(true);
  const [saving,   setSaving]   = useState(false);

  const modalRef = useRef(null);

  useEffect(() => {
    getNotes().finally(() => setLoading(false));
    // eslint-disable-next-line
  }, []);

  const updateNote = (currentNote) => {
    setENote({
      id:           currentNote._id,
      etitle:       currentNote.title,
      edescription: currentNote.description,
      etag:         currentNote.tag,
    });
    // trigger bootstrap modal via DOM (kept for simplicity; modal markup below)
    document.getElementById('editModalBtn').click();
  };

  const handleEditNote = async (e) => {
    e.preventDefault();
    setSaving(true);
    await editNote(eNote.id, eNote.etitle, eNote.edescription, eNote.etag);
    showAlert("Note updated!", "success");
    setSaving(false);
    document.getElementById('editModalClose').click();
  };

  const onChange = (e) => setENote({ ...eNote, [e.target.name]: e.target.value });

  const filtered = notes.filter(n => {
    const matchTag    = filter === 'All' || n.tag === filter;
    const matchSearch = !search ||
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.description.toLowerCase().includes(search.toLowerCase());
    return matchTag && matchSearch;
  });

  return (
    <div>
      {/* Add note */}
      <AddNotes />

      {/* Search + filter bar */}
      {notes.length > 0 && (
        <div className="notes-bar">
          <div className="notes-search-wrap">
            <i className="fa-solid fa-magnifying-glass notes-search-icon"></i>
            <input
              className="notes-search"
              placeholder="Search notes…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && (
              <button className="notes-search-clear" onClick={() => setSearch('')}>
                <i className="fa-solid fa-xmark"></i>
              </button>
            )}
          </div>

          <div className="notes-filters">
            {TAGS.map(t => (
              <button
                key={t}
                className={`notes-filter-btn${filter === t ? ' notes-filter-active' : ''}`}
                onClick={() => setFilter(t)}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Notes grid */}
      {loading && (
        <div className="notes-loading">
          <div className="nb-spinner"></div>
          <span>Loading notes…</span>
        </div>
      )}

      {!loading && filtered.length === 0 && notes.length > 0 && (
        <div className="notes-empty">
          <div className="notes-empty-icon">🔍</div>
          <p>No notes match your search.</p>
          <button className="btn-ghost-c" onClick={() => { setSearch(''); setFilter('All'); }}>Clear filters</button>
        </div>
      )}

      {!loading && notes.length === 0 && (
        <div className="notes-empty">
          <div className="notes-empty-icon">📝</div>
          <p>No notes yet. Create your first note above!</p>
        </div>
      )}

      <div className="notes-grid">
        {filtered.map(note => (
          <Noteitem key={note._id} note={note} updateNote={updateNote} />
        ))}
      </div>

      {/* Hidden button to open Bootstrap modal */}
      <button id="editModalBtn" data-bs-toggle="modal" data-bs-target="#editNoteModal" style={{display:'none'}}></button>

      {/* Bootstrap Edit Modal — styled via Notes.css */}
      <div className="modal fade" id="editNoteModal" tabIndex="-1" ref={modalRef}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content notes-modal-content">
            <div className="notes-modal-header">
              <h5 className="notes-modal-title">Edit Note</h5>
              <button id="editModalClose" type="button" className="notes-modal-close" data-bs-dismiss="modal">
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <form onSubmit={handleEditNote}>
              <div className="notes-modal-body">
                <div className="addnote-field" style={{marginBottom:'14px'}}>
                  <label className="in-label">Title</label>
                  <input
                    type="text" name="etitle"
                    className="in-field"
                    value={eNote.etitle}
                    onChange={onChange}
                    minLength={5} required
                  />
                </div>
                <div className="addnote-field" style={{marginBottom:'14px'}}>
                  <label className="in-label">Description</label>
                  <textarea
                    name="edescription"
                    className="in-field addnote-textarea"
                    value={eNote.edescription}
                    onChange={onChange}
                    minLength={5} required rows={4}
                  />
                </div>
                <div className="addnote-field">
                  <label className="in-label">Tag</label>
                  <input
                    type="text" name="etag"
                    className="in-field"
                    value={eNote.etag}
                    onChange={onChange}
                  />
                </div>
              </div>
              <div className="notes-modal-footer">
                <button type="button" className="btn-ghost-c" data-bs-dismiss="modal">Cancel</button>
                <button type="submit" className="btn-primary-c" disabled={saving}>
                  {saving ? <><span className="auth-spinner"></span> Saving…</> : 'Save changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notes;
