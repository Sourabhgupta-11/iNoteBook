import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'
import alertContext from '../context/alert/alertContext';

const Noteitem = (props) => {
  const { showAlert } = useContext(alertContext);
  const {note,updateNote}=props
  const context=useContext(noteContext);
  const {deleteNote}=context
  return (
    <div className='col-md-4'>
      <div className="card shadow-sm border-0 rounded-3 my-3 bg-white">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{note.tag}</h6>
          <p className="card-text">{note.description}</p>
          <div className="d-flex justify-content-end">
            <i className="fa-solid fa-pen-to-square text-primary me-3" onClick={() => updateNote(note)} style={{ cursor: 'pointer' }}></i>
            <i className="fa-solid fa-trash-can text-danger" onClick={() => { deleteNote(note._id); showAlert("Deleted successfully", "success"); }} style={{ cursor: 'pointer' }}></i>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Noteitem