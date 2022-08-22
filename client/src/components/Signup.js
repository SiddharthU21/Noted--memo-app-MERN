import React , {useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {
  
  const [creds, setCreds] = useState({name : "" ,email : "", password : "", cpassword : ""})
 
  let history = useNavigate();
  
  const onChange = (e)=>{
      setCreds({...creds, [e.target.name]: e.target.value })
    }

  const handleSubmit = async(e) =>{
      e.preventDefault();
      const {name,email, password, cpassword } = creds;
      if(password===cpassword)
    {
        const response = await fetch( `http://localhost:${process.env.PORT}/api/auth/createuser`, 
        {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            }, 
            body: JSON.stringify({name,email,password})  
        });
        const json = await response.json()
        if(json.success){
          
          localStorage.setItem('token' , json.authtoken)
          history('/');
          props.showAlert('Account created successfully','success')
        }
        else{
          props.showAlert('Email aldready exists','danger')
        } 
    }
      else{
        props.showAlert('The passwords do not match','danger')
      } 
  }

  return (
    <form className="my-5"  onSubmit={handleSubmit}>
      <h4 className='text-center'><strong>Signup</strong></h4>
            <div className="mb-4">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" name='name' aria-describedby="emailHelp" onChange={onChange}/>
            </div>
            <div className="mb-4">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={onChange}/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-4">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password"  className="form-control" id="password" name='password' onChange={onChange} minLength = {5} required/>
            </div>
            <div className="mb-4">
                <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                <input type="password"  className="form-control" id="cpassword" name='cpassword' onChange={onChange} minLength = {5} required/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  )
}

export default Signup