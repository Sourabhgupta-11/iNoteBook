import React, { useContext, useEffect ,useRef,useState} from 'react'
import noteContext from '../context/notes/noteContext'
import Noteitem from './Noteitem'
import AddNotes from './AddNotes'
import { useNavigate } from 'react-router-dom'
import alertContext from '../context/alert/alertContext'

const Notes = () => {
  const { showAlert } = useContext(alertContext);
  const context=useContext(noteContext)
  const {notes,getNote,editNote,getNotesByTag} = context
  const [uniqueTags, setUniqueTags] = useState([]);

  let navigate=useNavigate()
  useEffect(()=>{
    if(localStorage.getItem('token')){
      getNote();
    }
    else{
      navigate('/login')
    }
    // eslint-disable-next-line
  },[])

  useEffect(() => {
    const tags = [...new Set(notes.map(note => note.tag.trim()))];
    setUniqueTags(tags.filter(tag => tag));
  }, [notes]);

  const refOpen=useRef(null)
  const refClose = useRef(null);

  const [note,setNote]=useState({id:"",etitle:"",edescription:"",etag:""})

  const updateNote=(currentNote)=>{
    refOpen.current.click();
    setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})

  }

  const handleClick=(e)=>{
      editNote(note.id,note.etitle,note.edescription,note.etag)
      refClose.current.click();
      showAlert("Updated successfully","success")
  }
  
  const onChange=(e)=>{
      setNote({...note, [e.target.name]:e.target.value})
  }

    const handleFilterChange = (e) => {
    const selectedTag = e.target.value;
    if (selectedTag === "all") {
      getNote();
    } else {
      getNotesByTag(selectedTag);
    }
  };

  return (
    <>
    <AddNotes/> 
    <button ref={refOpen} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
      Launch demo modal
    </button>
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form> 
            <div className="mb-3 my-3">
              <label htmlFor="etitle" className="form-label">Title</label>
              <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange}/>
            </div>
            <div className="mb-3">
              <label htmlFor="edescription" className="form-label">Description</label>
              <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription}  aria-describedby="emailHelp" onChange={onChange}/>
            </div>
            <div className="mb-3">
              <label htmlFor="etag" className="form-label">Tag</label>
              <input type="text" className="form-control" id="etag" name="etag" value={note.etag} aria-describedby="emailHelp" onChange={onChange}/>
            </div>
            </form>
          </div>
          <div className="modal-footer">
            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
          </div>
        </div>
      </div>
    </div>

    <div className="container">
      <label htmlFor="tagFilter" className="form-label">Filter by Tag:</label>
      <select className="form-select w-25 mb-3" onChange={handleFilterChange}>
        <option value="all">All</option>
        {uniqueTags.map((tag, index) => (
          <option key={index} value={tag}>{tag}</option>
        ))}
      </select>
    </div>

    <div className="container my-3">
        <h2 className='mb-3'>Your Notes</h2>
        <div className='row'>
          <div>{notes.length===0 && 'No notes to display'}</div>
          {notes.map((note)=>{
            return <Noteitem key={note._id} updateNote={updateNote} note={note}/>
          })}
        </div>
    </div>
    </>
  )
}

export default Notes