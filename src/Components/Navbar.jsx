import React, {useState, useEffect} from 'react' 
import { Link } from 'react-router-dom'
import '../CSS/Navbar.css'
import cart from '../Components/assets/cart.png'
import profile from '../Components/assets/profile.png'
import {auth,db} from '../FirebaseConfigs/FirebaseConfig'
import {collection, doc, getDocs, query, where} from 'firebase/firestore' 
import { async } from '@firebase/util' 

const Navbar = () => {
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
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to="/"><button>Home</button> </Link>
        <Link to="/signup"><button>Register</button> </Link>
        <Link to="/login"><button>Login</button> </Link>
        <Link to="/products"><button>Products</button> </Link>

        <Link to="/cart">
            <div className='cart-btn'>
                <img src={cart} alt='cart' />
                <span className='cart-icon-css' >0</span> 
            
            </div>
        </Link>

        
        <Link to="userprofile">
            <img src={profile} className='profile-icon' />
        </Link>
        <p>{loggedUser ? loggedUser[0].email : "No user"}</p>
        {loggedUser ? <button onClick={()=>{auth.signOut()}}>Logout</button> : null} 
        
    </nav>
  )
}

export default Navbar