import React from 'react'
import { Link } from 'react-router-dom'
import '../CSS/Navbar.css'
import cart from '../Components/assets/cart.png'
import profile from '../Components/assets/profile.png'

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to="/"><button>Home</button> </Link>
        <Link to="/signup"><button>Register</button> </Link>
        <Link to="/login"><button>Login</button> </Link>

        <Link to="/cart">
            <div className='cart-btn'>
                <img src={cart} alt='cart' />
                <span className='cart-icon-css' >0</span> 
            
            </div>
        </Link>

        
        <Link to="userprofile">
            <img src={profile} className='profile-icon' />
        </Link>

    </nav>
  )
}

export default Navbar