import React,{useState} from 'react'
import noteContext from './noteContext'

const NoteState = (props) => {
  const host='http://localhost:5000'
  const [notes,setNotes]=useState([])

  //----------------------GET NOTES----------------------------------//
  const getNote=async ()=>{
    const response=await fetch(`${host}/api/notes/`,{
      method:'GET',
      headers: {
        'Content-Type':'application/json',
        'Authorization':`Bearer ${localStorage.getItem('token')}`
      }
    })
    const json=await response.json();
    console.log(json)
    setNotes(json)
  }

  //----------------------GET NOTES BY TAG----------------------------------//
  const getNotesByTag = async (tag) => {
  const response = await fetch(`${host}/api/notes/bytag/${tag}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  const json = await response.json();
  setNotes(json);
  };

  //----------------------ADD NOTES----------------------------------//
  const addNote=async (title,description,tag)=>{
    const response=await fetch(`${host}/api/notes/addNote`,{       //Sends a network request to your backend.
      method:'POST',
      headers: {
        'Content-Type':'application/json',
        'Authorization':`Bearer ${localStorage.getItem('token')}`
      },                                                          //'Content-Type': 'application/json' tells the server you're sending JSON data.
                                                                  //'Authorization': 'Bearer <token>' sends a JWT token to authenticate the user
      body:JSON.stringify({title,description,tag})
    })
    const note=await response.json();                                        //Converts the HTTP response body into a JavaScript object

    //Authenticate the user using the token.
    //Create a new note.
    //Save the note to the database

    //----------------------------This made changes to our UI-------------------------------------//
    setNotes(notes.concat(note))
  }

  //----------------------DELETE NOTES----------------------------------//
  const deleteNote=async (id)=>{
    const response=await fetch(`${host}/api/notes/deleteNote/${id}`,{
      method:'DELETE',
      headers: {
        'Content-Type':'application/json',
        'Authorization':`Bearer ${localStorage.getItem('token')}`
      }
    })
    const json=await response.json();
    console.log(json)
    const newNotes=notes.filter((note)=>{return note._id!==id})
    setNotes(newNotes)
  }

  //----------------------UPDATE NOTES----------------------------------//
  const editNote= async(id,title,description,tag)=>{
    const response=await fetch(`${host}/api/notes/updateNote/${id}`,{
      method:'PUT',
      headers: {
        'Content-Type':'application/json',
        'Authorization':`Bearer ${localStorage.getItem('token')}`
      },
      body:JSON.stringify({title,description,tag})
    })
    await response.json();

    let newNotes=JSON.parse(JSON.stringify(notes))
    for(let i=0;i<notes.length;i++){
      const element=notes[i];
      if(element._id===id){
        newNotes[i].title=title;
        newNotes[i].description=description;
        newNotes[i].tag=tag;
        break;
      }
    }
    setNotes(newNotes)
  }

  return (
    <noteContext.Provider value={{notes,addNote,deleteNote,editNote,getNote,getNotesByTag}}>
        {props.children}
    </noteContext.Provider>
  )
}

export default NoteState;