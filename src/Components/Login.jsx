import React, {useState} from 'react'
import Navbar from './Navbar'
import '../CSS/Login.css' 
import {Link} from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

 
  const auth = getAuth()
  const navigate = useNavigate() 

  

  const handleLogin = (e) => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setEmail('')
        setPassword('')
        setErrorMsg('')
        setTimeout(() => {
          setSuccessMsg('')
          navigate('/home')
        } , 3000)
      })
      .catch((error) => {
        const errorCode = error.code
        console.log(error.message)
        if(errorCode === 'Firebase: Error (auth/invalid-email)') {
          setErrorMsg('User not found.')
        }
        if(error.message === 'Firebase: Error (auth/user-not-found)') {
          setErrorMsg('email not found.')
        }
        if(error.message === 'Firebase: Error (auth/wrong-password)') {
          setErrorMsg('password is incorrect.')
        }
      })
  } 


  return (
    

    <div>
            <Navbar />
      <div className="login-container">
        <form className='login-form' >

          <p>Login</p>

          {successMsg ? <div className='success-msg'>{successMsg}</div> : null}
          {errorMsg ? <div className='error-msg'>{errorMsg}</div> : null}



          

          <label>Email</label>
          <input onChange={(e)=> setEmail(e.target.value)} type='email' placeholder='email' />

          <label>Password</label>
          <input onChange={(e)=> setPassword(e.target.value)} type='password' placeholder='password' />

          

          <button onClick={handleLogin}>Login</button> 

          <div>
            <p>Dont't have an account? <Link to="/signup">Register</Link></p>
          </div>

          

        </form>
      </div>
    </div>
  )
}

export default Login