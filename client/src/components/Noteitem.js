import React ,{useContext} from 'react'
import NoteContext from '../context/notes/NoteContext';

const Noteitem = (props) => {
    const context = useContext(NoteContext);
    const {deleteNote} = context ;

    const { note , updateNote} = props;
    return (
        <div className='col-md-3 my-3'>
            <div className="card text-center">
                <div className="card-body">
                    <h5 className="card-title"> <strong>{note.title}</strong></h5>
                    <hr />
                    <p className="card-text">{note.description}</p>
                    <i className="fa-solid fa-trash mx-2 text-primary" onClick={()=>{deleteNote(note._id); props.showAlert("Deleted Succesfully",'success')}}></i>
                    <i className="fa-solid fa-pen-to-square mx-2 text-primary" onClick={()=>{updateNote(note)}}></i>
                </div>
                <div className="card-footer text-muted">
                   {note.date.slice(0,10)}
                </div>
            </div>
        </div>
    )
}

export default Noteitem