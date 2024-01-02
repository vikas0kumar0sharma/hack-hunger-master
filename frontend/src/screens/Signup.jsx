import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Signup = () => {
  const navigate=useNavigate()
  const [credentials,setCredentials]=useState({name:"",email:"",password:"",location:""})

  const handleSubmit=async(e)=>{
    e.preventDefault()
    const response=await fetch("http://localhost:5000/api/createUser",{
      method:'post',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password,location:credentials.location})
    })
    const res=await response.json()

    if(!res.success){
      alert('Enter valid credentials')
    }
    if(res.success){
      navigate('/login')
    }
    setCredentials({name:"",email:"",password:"",location:""})
  }

  const onChange=(e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value})
  }

  return (
    <>
      <div className='container'>
        <form onSubmit={handleSubmit}>

          <div className="mt-3 form-group">
            <label>Name</label>
            <input type="text" className="form-control" placeholder="Enter Name" name='name' value={credentials.name} onChange={onChange} />
          </div>

          <div className="mt-3 form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter email" name='email' value={credentials.email} onChange={onChange} />
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>

          <div className="mt-3 form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" name='password' value={credentials.password} onChange={onChange} />
          </div>

          <div className="mt-3 form-group">
            <label htmlFor="exampleInputPassword1">Address</label>
            <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Location" name='location' value={credentials.location} onChange={onChange} />
          </div>

          <button type="submit" className="m-3 btn btn-success">Submit</button>
          <Link to="/login" className='m-3 btn btn-danger'>Already a user?</Link>
        </form>
      </div>
    </>
  )
}

export default Signup