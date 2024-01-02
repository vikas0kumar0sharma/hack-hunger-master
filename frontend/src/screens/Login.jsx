import React,{useState} from 'react'
import { Link } from 'react-router-dom'
const { useNavigate } = require('react-router-dom')

const Login = () => {
  
  const navigate=useNavigate()
  const [credentials,setCredentials]=useState({email:"",password:""})

  const handleSubmit=async(e)=>{
    e.preventDefault()
    const response=await fetch("http://localhost:5000/api/loginUser",{
      method:'post',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({email:credentials.email,password:credentials.password})
    })
    const res=await response.json()

    console.log(res)

    if(!res.success){
      alert('Enter valid credentials')
    }

    if(res.success){
       localStorage.setItem('useremail',credentials.email)
       localStorage.setItem('authToken',res.authToken)
       console.log(localStorage.getItem('authToken'))
       navigate('/')
    }

    setCredentials({email:"",password:""})
  }

  const onChange=(e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value})
  }

  return (
    <>
      <div className='container'>
        <form onSubmit={handleSubmit}>

          <div className="mt-3 form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter email" name='email' value={credentials.email} onChange={onChange} />
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>

          <div className="mt-3 form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" name='password' value={credentials.password} onChange={onChange} />
          </div>

          <button type="submit" className="m-3 btn btn-success">Submit</button>
          <Link to="/Signup" className='m-3 btn btn-danger'>New User?</Link>
        </form>
      </div>
    </>
  )
}

export default Login