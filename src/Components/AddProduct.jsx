import React, {useState, useEffect, ref} from 'react'
import Navbar from './Navbar'
import {auth,db,storage} from '../FirebaseConfigs/FirebaseConfig'
import {addDoc, collection, doc, getDocs, query, where} from 'firebase/firestore' 
import '../CSS/AddProduct.css'
import { getDownloadURL, uploadBytes } from 'firebase/storage'


const AddProduct = () => {
    const [producttitle, setProductTitle] = useState('');
    const [productType, setProductType] = useState('');
    const [description, setDescription] = useState('');
    const [brand, setBrand] = useState('');
    const [customerSupport, setCustomerSupport] = useState('');
    const [price, setPrice] = useState('');
    const [warraty, setWarraty] = useState('');
    const [productImage, setProductImage] = useState(''); 

    const [imageError, setImageError] = useState('');
    const [successMsg , setSuccessMsg] = useState('');
    const [uploadError, setUploadError] = useState('');



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
     if(loggedUser){console.log(loggedUser[0].password)}

    const types = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif']; 

     const handleProductImg = (e)=>{
        e.preventDefault();
        let selectedFile = e.target.files[0];
        if(selectedFile){
            if(types.includes(selectedFile.type)){
                setImageError('');
                setProductImage(selectedFile);
            }
            else{
                setProductImage(null); 
                setImageError('Please select an image');
            }

            

        }else{
            setImageError('Please select an image');
        }

     }
     const handleAddProduct = (e)=>{ 
        e.preventDefault();
        const storageRef = ref(storage,`product-images${productType.toUpperCase()}
        /${Date.now()}`);    
        console.log(storageRef._location.path); 
        
        uploadBytes(storageRef, productImage)
        .then(()=>{
            getDownloadURL(storageRef).then(url => {
              addDoc(collection(db,`products-${productType.toUpperCase()}`),{ 
              producttitle,
              productType,
              description,
              brand,
              customerSupport,
              price,
              warraty,
              productImage: url
              })


            })
        })

     } 
  return (

    
    <div>
        <Navbar/> 
        {loggedUser ? loggedUser[0].password : "no data"}
        <div className='addprod-container' > 
            <form className='addprod-form' onSubmit={handleAddProduct} >
                <p>Add Product</p>
                {successMsg && <div className='success-msg'>{successMsg}</div>}
                {uploadError && <div className='error-msg'>{uploadError}</div>}
                <label>Product Title</label>
                <input type='text' value={producttitle} onChange={(e)=>{setProductTitle
                (e.target.value)}} placeholder="product title" />
                <label>Product Type</label>
                <input type='text' value={productType} onChange={(e)=>{setProductType
                (e.target.value)} } placeholder="product type" />

                <label>Description</label>
                <textarea value={description} onChange={(e)=>{setDescription
                (e.target.value)} } placeholder="description" />

                <label>Brand</label>
                <input type='text' value={brand} onChange={(e)=>{setBrand
                (e.target.value)} } placeholder="brand" />
                <label>warraty</label>
                <input type='text' value={warraty} onChange={(e)=>{setWarraty
                (e.target.value)} } placeholder="warraty" />
                <label>Image</label>
                <input onChange={handleProductImg} type="file" /> 
                {imageError && <div className='error-msg'>{imageError}</div>}
                <label>Price + tax</label>
                <input type='text' value={price} onChange={(e)=>{setPrice
                (e.target.value)} } placeholder="price + tax" />
                <label>Customer Support</label>
                <input type='text' value={customerSupport} onChange={(e)=>{setCustomerSupport
                (e.target.value)} } placeholder="customer support" />

                <button type='submit'>Add Product</button>             


            </form>
        </div> : <div>No products</div> 
       
    </div>
  )
}

export default AddProduct