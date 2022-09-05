import React,{useState,useEffect} from 'react'
import Carousel from 'react-multi-carousel';
import Sliderproductcard from './Sliderproductcard';
import{
    collection,
    query,
    onSnapshot,getDocs
}from "firebase/firestore";
import {db} from "../../FirebaseConfigs/FirebaseConfig" 

const AllProductPage = (props) => {
    const [products,setProducts]=useState([]);
    useEffect(()=>{
        const getProducts = () => {
            const productsArray = [];
            const path = `products-${props.type.toUpperCase()}`;
            console.log(props);
            getDocs(collection(db,path)).then((querySnapshot)=>{
                querySnapshot.forEach((doc)=>{
                    productsArray.push({...doc.data(), id:doc.id});
                })
                setProducts(productsArray);
            }).catch("error getting documents");
        }
        getProducts();
    },[])
  return (
    <div>AllProductPage</div>
  )
}

export default AllProductPage