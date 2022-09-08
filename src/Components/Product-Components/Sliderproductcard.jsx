import React from 'react'

const Sliderproductcard = (product) => {
  return (
    <div className='mini-product-container'>
      <div className='mini-img-container'>
        <img src={product.product.prodimage} /> 

      </div>
      <div className='mini-product-details'>
        <h3>{product.product.prodname}</h3>
        <p>{product.product.prodprice}</p>
      </div>    

    </div>
  )
}

export default Sliderproductcard