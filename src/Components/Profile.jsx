import React, {useState, useEffect} from 'react'
import Navbar from './Navbar'
import {auth,db} from '../FirebaseConfigs/FirebaseConfig'
import {collection, doc, getDocs, query, where, updateDoc} from 'firebase/firestore' 
import { updateProfile } from 'firebase/auth' 
import '../CSS/Profile.css' 


const Profile = () => {
  function GetCurrentUser(){
    const [user, setUser] = useState('');  
    const userCollectionRef = collection(db,'users'); 

    useEffect(() => {
      auth.onAuthStateChanged(userlogged => {
        if(userlogged){
          const getUsers = async () => {
            const q = query(collection(db,'users'), where('uid', '==', userlogged.uid));
            console.log(q);
            const data = await getDocs(q);
            setUser(data.docs.map((doc)=>({...doc.data(), id: doc.id})));

          }
          getUsers();
        }
        else{
          setUser(null); 
        }
      })
    },[])
    return user;
}
 const loggedUser = GetCurrentUser();
  return (
    <div>

        <Navbar /> 

        <div className='profile-container'>
        {loggedUser ? <div className='user-profile'> 
            <p>Your account details</p>
            <div className='data-row'>
                <span>name</span>
                <span>{loggedUser[0].username}</span> 
            </div>
            <div className='data-row'>
                <span>email</span>
                <span>{loggedUser[0].email}</span> 
            </div>
            <div className='data-row'>
                <span>phone</span>
                <span>{loggedUser[0].phonenumber}</span> 
            </div>
            <div className='data-row'>
                <span>address</span>
                <span>{loggedUser[0].address}</span> 
            </div>
            </div> : 
              <div>
                  you are not logged in 

              </div>
        }
        </div>


    </div>
  )
}

export default Profile