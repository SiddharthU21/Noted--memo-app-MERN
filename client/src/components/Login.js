import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
    
    const [creds, setCreds] = useState({email : "", password : ""})
    let history = useNavigate();
    const onChange = (e)=>{
        setCreds({...creds, [e.target.name]: e.target.value })
      }

    const handleSubmit = async(e) =>{
        e.preventDefault();
        
        const response = await fetch( `http://localhost:${process.env.PORT || 5000}/api/auth/login`, 
        {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            }, 
            body: JSON.stringify({email : creds.email,password : creds.password})  
        });
        const json = await response.json()
        console.log(json)
        if(json.success){
            //saving auth token and redirecting
            localStorage.setItem('token' , json.authtoken)
            //using useNavigate to redirext to home page
            history('/');
            props.showAlert('Logged in successfully','success')
        }
        else{
            props.showAlert('Invalid credentials','danger')
        }
        
        
    }
    return (
        <form className="my-7" onSubmit={handleSubmit}>
            <h4 className='text-center'><strong>Login</strong></h4>
            <div className="mb-4">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" value={creds.email} name='email' aria-describedby="emailHelp" onChange={onChange}/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-4">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" value={creds.password} className="form-control" id="password" name='password' onChange={onChange}/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}

export default Login