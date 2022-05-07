
import './App.css';
import './custome-theme.scss'
import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';



function App() {

  const [alert, setAlert] = useState(null);
  
  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
        setAlert(null);
    }, 1500);
  }

  return (
    <>
    {/* what we have done is that we have wrapped all the components in the NoteState so all the props of our Note context would be available to all the components and sub components */}
    <NoteState>
    <Router>
    <Navbar/>
    <Alert alert={alert}/>
    <div className="container">
    <Routes>
      <Route exact path="/" element={<Home showAlert={showAlert}/>}/>
      <Route exact path="/about" element={<About/>}/>  
      <Route exact path="/login" element={<Login showAlert={showAlert}/>}/>  
      <Route exact path="/signup" element={<Signup showAlert={showAlert}/>}/>  
    </Routes>
    </div>
    </Router>
    </NoteState>
    </>
  );
}

export default App;
