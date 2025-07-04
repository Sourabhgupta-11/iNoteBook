import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import alertContext from '../context/alert/alertContext';

const AddNotes = () => {
const { showAlert } = useContext(alertContext);
const context=useContext(noteContext)
const {addNote}=context

const [note,setNote]=useState({title:"",description:"",tag:""})
const handleClick=(e)=>{
    e.preventDefault();
    addNote(note.title,note.description,note.tag)
    setNote({title:"",description:"",tag:""})
    showAlert("Added successfully","success")
}

const onChange=(e)=>{
    setNote({...note, [e.target.name]:e.target.value})
}

return (
  <div className="container my-4">
    <div className="card shadow-sm border-0 rounded-4">
      <div className="card-body">
        <h4 className="card-title mb-4">Add a Note</h4>
        <form> 
          <div className="mb-3 my-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={onChange}/>
          </div>
          <div className="mb-3">
          <label htmlFor="desc" className="form-label">Description</label>
          <input type="text" className="form-control" id="description" name="description" aria-describedby="emailHelp" value={note.description} onChange={onChange}/>
          </div>
          <div className="mb-3">
          <label htmlFor="desc" className="form-label">Tag</label>
          <input type="text" className="form-control" id="tag" name="tag" aria-describedby="emailHelp" value={note.tag} onChange={onChange}/>
          </div>
          <button type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
        </form>
      </div>
    </div>
  </div>
)}

export default AddNotes

