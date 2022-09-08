import React from 'react'
//import slider.css
// import '../Product-Components/Slider.css'


const Sliderproductcard = (product) => {
  // let overaalltax = 10/100
  // let overcommision = 10/100
  // let extraforfun = 10/100 

  // let mrp = parseInt(product.product.price)
  // mrp=mrp+mrp*overaalltax*mrp*overcommision*mrp+extraforfun*mrp
  // const saleprice = mrp - extraforfun*mrp  

  return ( //Mostrar el producto en el slider
    <div>
      <div className='product-container'>
      <img src={product.product.prodimage} />
      <div className='product-details'>
        <h3>{product.product.prodname}</h3>
        <p>MRP: {product.product.price}</p>
        <p>Price: {product.product.price}</p>
      </div>
      <div className='buy-cart'>
        <button className='add-to-cart'>Add to Cart</button>
        <button className='buy-now'>Buy Now</button>

      </div>
    </div>
    </div>
    
  )
}

export default Sliderproductcard