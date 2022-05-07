import React  from 'react'
import { Link , useLocation, useNavigate} from "react-router-dom";

export const Navbar = () => {
  let location = useLocation();
  let history = useNavigate();
  const Logoutfuncn  = ()=>{
      localStorage.removeItem('token');
      history('/login')
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">NOTED</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname==="/"?"active":""}`} aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname==="/about"?"active":"" }`} to="/about">About</Link>
            </li>
            {/* <li className="nav-item">
              <Link className={`nav-link ${location.pathname==="/login"?"active":""}`} to="/login">Login</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname==="/signup"?"active":""}`} to="/signup">Signup</Link>
            </li>  */}
          </ul>
          {!localStorage.getItem('token')?<form className="d-flex">
          <Link to="/login" className= 'btn btn-outline-light' role="button">Login</Link> 
          <Link to="/signup" className= 'btn btn-outline-light mx-2' role="button">Signup</Link>
          </form>:<button onClick={Logoutfuncn} type="button" className="btn btn-outline-light">Logout</button>}
        </div>
      </div>
    </nav>
  )
}

export default Navbar;

