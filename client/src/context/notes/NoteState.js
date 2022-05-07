
import NoteContext from "./NoteContext";
import { useState } from "react";

//@ --- this is the syntax for getting all the state variables as props in all the child components and therefore we have wrapped them in our Notestate component as we want all the children to access the same props without having to pass them consecutively in hierarchy

const NoteState = (props) => {
  
  const host = "http://localhost:5000"
  const notesInital = []
  const [notes, setNotes] = useState(notesInital);
  
  
  //Get all notes
  const getNotes = async () => {
    //apicall
    const response = await fetch(`${host}/api/notes/fetchallnotes`, 
    {
     method: 'GET',
     headers: {
       'Content-Type': 'application/json',
       'auth-token': localStorage.getItem('token')
     }
   });
   const json = await response.json()
   setNotes(json)
 }
   
  //Add a note
  const addNote = async (title, description, tag) => {
    
     //apicall
     const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({title,description,tag})
    });
    const note = await response.json()
    //concat used as it returns a new array with added element
    setNotes(notes.concat(note))
  }


  //delete a note
  const deleteNote = async(id) => {
     //apicall
     const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    });
    // const jsondata = response.json();

    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes);
  }



  //edit a note
  const editNote = async (id, title, description, tag) => {

    //apicall
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({title,description,tag})
    });
    // const jsondata = await response.json();

    //storing hard copy of our initial(after adding) notes in newnotes as we cannot directly change the state 
    let Newnotes = JSON.parse(JSON.stringify(notes))
    console.log(Newnotes);
    for (let index = 0; index < notes.length; index++) {
      const element = Newnotes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
        break;
      } 
    }
    setNotes(Newnotes);
  }




  
  return (
    //@
    <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote , getNotes}}>
      {props.children}
    </NoteContext.Provider>

  )
}

export default NoteState