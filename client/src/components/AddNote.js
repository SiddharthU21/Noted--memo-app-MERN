import React, {useState , useContext} from 'react'
import NoteContext from '../context/notes/NoteContext'

const AddNote = (props) => {
    const context = useContext(NoteContext);
    const {addNote} = context ;

    const [note, setNote] = useState({title:'', description:'' , tag:''})

    const addfuncn = (e)=>{
        //PREVENTS  page reload when event occurs
        e.preventDefault();
        addNote(note.title , note.description, note.tag)
        setNote({title:'', description:'' , tag:''})
        props.showAlert("Added Succesfully",'success')
    }

    const onChange = (e)=>{
        //spread operator(...) which adds or updates existing array elements to the note array in this case
        setNote({...note, [e.target.name]: e.target.value })
    }
  return (
    <div className="container my-3">
    <h2 className='text-center'> Add Note</h2>
    <form>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Title</label>
        <input placeholder='Title entered must be atleast 5 characters' value={note.title} type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" onChange={onChange} minLength={5} required/> 
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description</label>
        <textarea placeholder="Description entered must be atleast 5 characters"  value={note.description}type="text" className="form-control" id="description" name="description" onChange={onChange} minLength={5} required/>
      </div>
      <div className="mb-3">
        <label htmlFor="tag" className="form-label">Tag</label>
        <input type="text" value={note.tag} className="form-control" id="tag" name="tag" onChange={onChange}/>
      </div>
      <button disabled={note.title.length<5 || note.description.length<5 } type="submit" className="btn btn-primary" onClick={addfuncn}>Submit</button>
    </form>
  </div> 
  )
}

export default AddNote