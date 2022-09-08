import React,{useState,useEffect} from 'react'
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css"; 
import Sliderproductcard from './Sliderproductcard';
import{
    collection,
    query,
    onSnapshot,getDocs
}from "firebase/firestore";
import {db} from "../../FirebaseConfigs/FirebaseConfig" 


const ProductSlider = () => {

    const [products,setProducts]=useState([]); 
    useEffect(()=>{
        const getProducts = () => {
            const productsArray = [];
            getDocs(collection(db,'products-MOBILE')).then((querySnapshot)=>{
                querySnapshot.forEach((doc)=>{
                    productsArray.push({...doc.data(), id:doc.id});
                })
                setProducts(productsArray);
            }).catch("error getting documents");
        }
        getProducts();
    },[])
    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };
  return (
    <div>
        <Carousel responsive={responsive} >
            {products.map((product)=>
            
            (<Sliderproductcard key={product.id} product={product} />)
            
            )}
            
        </Carousel>;
    </div>
  )
}

export default ProductSlider