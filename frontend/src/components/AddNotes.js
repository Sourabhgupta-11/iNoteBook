import React, { useState, useContext } from 'react';
import noteContext from '../context/notes/noteContext';
import alertContext from '../context/alert/alertContext';
import './AddNotes.css';

const TAGS = ['Personal', 'Work', 'Ideas', 'Todo', 'Important'];

const AddNotes = () => {
  const { addNote }   = useContext(noteContext);
  const { showAlert } = useContext(alertContext);
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState({ title: '', description: '', tag: '' });
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setNote({ ...note, [e.target.name]: e.target.value });

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!note.title.trim() || !note.description.trim()) return;
    setLoading(true);
    await addNote(note.title, note.description, note.tag || 'General');
    showAlert("Note added!", "success");
    setNote({ title: '', description: '', tag: '' });
    setLoading(false);
    setOpen(false);
  };

  return (
    <div className="addnote-wrap">
      {!open ? (
        <button className="addnote-trigger" onClick={() => setOpen(true)}>
          <span className="addnote-trigger-icon">+</span>
          <span>New note</span>
        </button>
      ) : (
        <div className="addnote-card glass">
          <div className="addnote-card-header">
            <h5 className="addnote-card-title">New Note</h5>
            <button className="addnote-close" onClick={() => setOpen(false)}>
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>

          <form onSubmit={handleAddNote} className="addnote-form">
            <div className="addnote-field">
              <label className="in-label" htmlFor="title">Title <span className="req">*</span></label>
              <input
                type="text" name="title" id="title"
                className="in-field"
                placeholder="Note title"
                value={note.title}
                onChange={onChange}
                minLength={5} required autoFocus
              />
            </div>

            <div className="addnote-field">
              <label className="in-label" htmlFor="description">Description <span className="req">*</span></label>
              <textarea
                name="description" id="description"
                className="in-field addnote-textarea"
                placeholder="Write your note here…"
                value={note.description}
                onChange={onChange}
                minLength={5} required rows={4}
              />
            </div>

            <div className="addnote-field">
              <label className="in-label">Tag</label>
              <div className="addnote-tags">
                {TAGS.map(t => (
                  <button
                    type="button"
                    key={t}
                    className={`addnote-tag${note.tag === t ? ' addnote-tag-active' : ''}`}
                    onClick={() => setNote({ ...note, tag: note.tag === t ? '' : t })}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="addnote-actions">
              <button type="button" className="btn-ghost-c" onClick={() => setOpen(false)}>
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary-c"
                disabled={loading || note.title.length < 5 || note.description.length < 5}
              >
                {loading ? <><span className="auth-spinner"></span> Saving…</> : 'Save note'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddNotes;
