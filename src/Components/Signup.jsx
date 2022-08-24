import React from 'react'
import Navbar from './Navbar'
import { Link } from 'react-router-dom'


const Signup = () => {
  return (
    <div>
      <Navbar />
      <div className="signup-container">
        <form className='signup-form'>

          <p>Create Account</p>

          <label>Your Name</label>
          <input onChange={(e)=> setUsername(e.target.value)} type='text' placeholder='name' />

          <label>Mobile number</label>
          <input onChange={(e)=> setPhonenumber(e.target.value)} type='tel' placeholder='mobile number' />

          <label>Email</label>
          <input onChange={(e)=> setEmail(e.target.value)} type='email' placeholder='email' />

          <label>Password</label>
          <input onChange={(e)=> setPassword(e.target.value)} type='password' placeholder='password' />

          <label>Address</label>
          <textarea onChange={(e)=> setAddress(e.target.value)} type='text' placeholder='address'> </textarea>

          <button type='submit'>Signup</button> 

          <div>
            <p>Already have an account? <Link to="/login">Login</Link></p>
          </div>

          

        </form>
      </div>
    </div>
  )
}

export default Signup 