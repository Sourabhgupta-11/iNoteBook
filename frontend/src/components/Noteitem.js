import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import alertContext from '../context/alert/alertContext';
import './Noteitem.css';

const TAG_COLORS = {
  Personal:  { bg: 'rgba(99,102,241,0.12)',  border: 'rgba(99,102,241,0.3)',  color: '#a5b4fc' },
  Work:      { bg: 'rgba(16,185,129,0.12)',  border: 'rgba(16,185,129,0.3)',  color: '#6ee7b7' },
  Ideas:     { bg: 'rgba(245,158,11,0.12)',  border: 'rgba(245,158,11,0.3)',  color: '#fcd34d' },
  Todo:      { bg: 'rgba(59,130,246,0.12)',  border: 'rgba(59,130,246,0.3)',  color: '#93c5fd' },
  Important: { bg: 'rgba(239,68,68,0.12)',   border: 'rgba(239,68,68,0.3)',   color: '#fca5a5' },
  General:   { bg: 'rgba(148,163,184,0.10)', border: 'rgba(148,163,184,0.2)', color: '#94a3b8' },
};

const Noteitem = ({ note, updateNote }) => {
  const { deleteNote }  = useContext(noteContext);
  const { showAlert }   = useContext(alertContext);
  const [deleting, setDeleting] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    await deleteNote(note._id);
    showAlert("Note deleted", "danger");
    setDeleting(false);
  };

  const tagStyle = TAG_COLORS[note.tag] || TAG_COLORS.General;
  const isLong   = note.description.length > 120;
  const preview  = isLong && !expanded
    ? note.description.slice(0, 120) + '…'
    : note.description;

  const dateStr = new Date(note.date).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  });

  return (
    <div className={`noteitem glass${deleting ? ' noteitem-deleting' : ''}`}>
      {/* Tag + date row */}
      <div className="noteitem-meta">
        <span
          className="noteitem-tag"
          style={{ background: tagStyle.bg, borderColor: tagStyle.border, color: tagStyle.color }}
        >
          {note.tag || 'General'}
        </span>
        <span className="noteitem-date">{dateStr}</span>
      </div>

      {/* Title */}
      <h5 className="noteitem-title">{note.title}</h5>

      {/* Description */}
      <p className="noteitem-desc">{preview}</p>
      {isLong && (
        <button className="noteitem-expand" onClick={() => setExpanded(v => !v)}>
          {expanded ? 'Show less' : 'Read more'}
        </button>
      )}

      {/* Actions */}
      <div className="noteitem-actions">
        <button
          className="noteitem-btn noteitem-edit"
          onClick={() => updateNote(note)}
          title="Edit"
        >
          <i className="fa-solid fa-pen-to-square"></i>
          <span>Edit</span>
        </button>
        <button
          className={`noteitem-btn noteitem-delete${deleting ? ' noteitem-btn-loading' : ''}`}
          onClick={handleDelete}
          disabled={deleting}
          title="Delete"
        >
          {deleting
            ? <><span className="auth-spinner" style={{width:'13px',height:'13px',borderWidth:'2px'}}></span><span>Deleting…</span></>
            : <><i className="fa-solid fa-trash"></i><span>Delete</span></>
          }
        </button>
      </div>
    </div>
  );
};

export default Noteitem;
