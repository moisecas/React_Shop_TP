import React, {useState} from 'react' //useState is a hook that allows us to use state in functional components
import Navbar from './Navbar'
import { Link, useNavigate } from 'react-router-dom'
import {createUserWithEmailAndPassword} from 'firebase/auth'
import {auth, db} from '../FirebaseConfigs/FirebaseConfig' 
import {collection,addDoc} from 'firebase/firestore' 
import '../CSS/Signup.css' 




const Signup = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [phonenumber, setPhonenumber] = useState('')
    const [address, setAddress] = useState('')

    const navigate=useNavigate() //useNavigate is a hook that allows us to use navigate in functional components

    const [errorMsg, setErrorMsg] = useState('')
    const [successMsg, setSuccessMsg] = useState('') //useState is a hook that allows us to use state in functional components

    const handleSubmit = (e) => { //handleSubmit is a function that allows us to handle the submit event
        e.preventDefault()
        createUserWithEmailAndPassword(auth, email, password) //createUserWithEmailAndPassword is a function that allows us to create a user with an email and password
            .then((userCredential) => { //userCredential is a variable that allows us to access the user credential))
                const user = userCredential.user //user is a variable that allows us to access the user
                const initialcartvalue = 0 
                console.log(user)   
                addDoc(collection (db, 'users'), {
                    username: username,
                    email: email,
                    phonenumber: phonenumber,
                    password: password,
                    cart: initialcartvalue,
                    address: address,
                    uid: user.uid

                }) //addDoc is a function that allows us to add a document to a collection in firebase

              navigate('/') //navigate is a function that allows us to navigate to a page
            }).then(() => {
                setSuccessMsg('Account created successfully') //setSuccessMsg is a function that allows us to set the success message
                setUsername('')
                setPassword('')
                setEmail('')
                setPhonenumber('')
                setAddress('')
                setErrorMsg('') 
                setTimeout(() => {
                    setSuccessMsg('') 
                    navigate('/login') //navigate is a function that allows us to navigate to a page 
                } , 3000) //setTimeout is a function that allows us to set a timeout

            })
            .catch((error) => { //error is a variable that allows us to access the error
              if(error.message === 'Firebase: Error (auth/invalid-email).')  //if the error message is equal to firebase error (auth/email-already-in-use)
              {
                setErrorMsg('The email address is already in use by another account.')
              }
              if(error.message === 'Firebase: Error(auth/email-already-in-use).') //if the error message is equal to firebase error (auth/email-already-in-use)
              {
                setErrorMsg('The email address is badly formatted.')
              }

            } )         
            
          

    }

  return (
    <div>
      <Navbar />
      <div className="signup-container">
        <form className='signup-form' onSubmit={handleSubmit} >

          <p>Create Account</p>

          {successMsg ? <div className='success-msg'>{successMsg}</div> : null}
          {errorMsg ? <div className='error-msg'>{errorMsg}</div> : null}



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