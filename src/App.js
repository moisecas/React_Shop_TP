
import './App.css';
import {BrowserRouter, RouteProps, Route, Routes} from 'react-router-dom'; 
import Home from './Components/Home';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Navbar from './Components/Navbar';
import NotFound from './Components/NotFound';
import Cart from './Components/Cart';
import Profile from './Components/Profile';
import Products from './Components/AddProduct';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/navbar" element={<Navbar />} />  */} 
        <Route path="/cart" element={<Cart />} /> 
        <Route path="/userprofile" element={<Profile />} />
        <Route path="/products" element={<Products />} />

        <Route path="*" element={<NotFound />} /> {/* * means any other path */}
      </Routes>

    </BrowserRouter>
  );
}

export default App;
