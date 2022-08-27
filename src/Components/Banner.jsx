
import React, {useState} from 'react'
import {Carousel} from 'react-bootstrap';  
import 'bootstrap/dist/css/bootstrap.min.css';
import slide1 from './assets/banner/1.png'
import slide2 from './assets/banner/2.png'

const Banner = () => {
    
  return (
    <Carousel>
        <Carousel.Item>
            <img className="d-block w-100" 
            src={slide1} 
            alt="slide1" />
            <Carousel.Caption>
                <h3>First slide label</h3>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
            <img className="d-block w-100" 
            src={slide2} 
            alt="slide2" />
            <Carousel.Caption>
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
        </Carousel.Item>
    </Carousel>
  )
}


export default Banner; 