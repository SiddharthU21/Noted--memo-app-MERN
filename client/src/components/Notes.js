import React, { useContext, useEffect, useRef , useState } from 'react'
import NoteContext from '../context/notes/NoteContext';
import AddNote from './AddNote';
import Noteitem from './Noteitem';
import { useNavigate } from 'react-router-dom'

const Notes = (props) => {
  //using usecontext we can access the notestate values we destructured such as notes and the setNote Funcn
  const context = useContext(NoteContext);
  const { notes, getNotes , editNote } = context;

  let history = useNavigate();

  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes()
    }
    else{
      history('/login')
    }
    //  eslint-disable-next-line
  }, [])

  const updateNote = (currentNote) => {
      ref.current.click();
      setNote({id : currentNote._id, etitle : currentNote.title, edescription : currentNote.description, etag : currentNote.tag})
      props.showAlert("Updated Succesfully",'success')
  }

  const ref = useRef(null)
  const refC = useRef(null)

  const [note, setNote] = useState({id:'', etitle:'', edescription:'' , etag:''})

  const updatefuncn = (e)=>{
    //PREVENTS  page reload when event occurs
    e.preventDefault();
    editNote(note.id,note.etitle,note.edescription,note.etag);
    refC.current.click();
    props.showAlert("Updated Succesfully",'success')
  }

const onChange = (e)=>{
    //spread operator(...) which adds or updates existing array elements to the note array in this case
    setNote({...note, [e.target.name]: e.target.value })
  }
  return ( 
    
    <>
      <AddNote showAlert={props.showAlert} />
      <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                      <form>
                        <div className="mb-3">
                          <label htmlFor="title" className="form-label">Title</label>
                          <input type="text" value={note.etitle} className="form-control" id="etitle" name='etitle' aria-describedby="emailHelp" onChange={onChange} minLength={5} required/> 
                        </div>
                        <div className="mb-3">
                          <label htmlFor="description" className="form-label">Description</label>
                          <textarea type="text" value={note.edescription} className="form-control" id="edescription" name="edescription" onChange={onChange} minLength={5} required/>
                        </div>
                        <div className="mb-3">
                          <label htmlFor="tag" className="form-label">Tag</label>
                          <input type="text" value={note.etag} className="form-control" id="etag" name="etag" onChange={onChange} />
                        </div>
                    </form>
            </div>
            <div className="modal-footer">
              <button type="button" ref={refC} className="btn btn-secondary d-none" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length<5 || note.edescription.length<5}  type="button" className="btn btn-primary" onClick={updatefuncn}>Save changes</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2 className='text-center'> Your Notes </h2>
        {notes.map((note) => {

          return <Noteitem key={note._id} showAlert={props.showAlert}updateNote={updateNote} note={note} />

        })}
      </div>
    </>
  )
}

export default Notes