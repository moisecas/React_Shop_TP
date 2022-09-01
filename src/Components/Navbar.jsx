import React, {useState, useEffect} from 'react' 
import { Link, Navigate, useNavigate } from 'react-router-dom'
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

 const navigate = useNavigate();


 const handleLogout = () => {
    auth.signOut().then(()=>{
      navigate('/login'); 
    })
 } 

  return (
    <div>
      <div className="navbar">
        <div className="LeftContainer">
        </div>
        <div>
        {!loggedUser && <nav>
          <Link to="/"><button>Home</button></Link>
          <Link to="/signup"><button>Register</button></Link>
          <Link to="/login"><button>Login</button></Link> 

          <div className='cart-btn'>
            <img src={cart} alt="cart" />
            <span className='cart-count'>0</span>
          </div>
          <Link to="/profile">
            <img src={profile} alt="profile"  className='profile-icon'/>
          </Link>
          </nav>}

          {loggedUser  && <nav>
            <Link to="/"><button>Home</button></Link>
            <Link to="/products"><button>Products</button></Link>

            <div className='cart-btn'>
              <img src={cart} alt="cart" />
              <span className='cart-count'>{loggedUser[0].cart}</span> 
            </div>
            <Link to="/profile">
              <img src={profile} alt="profile" />
            </Link>
            <button className='logout-btn' onClick={handleLogout}>Logout</button>  
            </nav>
          
          }
        </div>
      </div>
      <div className='product-types'>
      
         <a href='/product-type/skinps4'><button>Skin PS4</button> </a>
          <a href='/product-type/skinxbox'><button>Skin Xbox</button> </a>
          <a href='/product-type/skinps3'><button>Skin PS3</button> </a>
          <a href='/product-type/skinnintendo'><button>Skin Nintendo</button> </a>

      </div>
    </div>
  )
}

export default Navbar