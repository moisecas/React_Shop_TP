import React, {useState, useEffect} from 'react'
import Navbar from './Navbar'
import Products from './Products' 
import Banner from './Banner'
import {auth,db} from '../FirebaseConfigs/FirebaseConfig'
import {collection, doc, getDocs, query, where} from 'firebase/firestore' 
//import productslider component
import ProductSlider from './Product-Components/ProductSlider'



const Home = () => {
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
        <Banner />
        <ProductSlider type={'mobile'} />
        <p>{loggedUser ? loggedUser[0].email : "no data"}</p>
        
    </div>
  )
}

export default Home