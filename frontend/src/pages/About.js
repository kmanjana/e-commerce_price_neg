import React from 'react';
import MutipleProducts from "../assets/products.png";
import '../styles/About.css'

export default function About() {
  return (
    <div className='about'>
      <div className='aboutTop'
      style={{ backgroundImage: `url(${MutipleProducts})` }}
      >
      </div>
      <div className='aboutBottom'>
        <h1> ABOUT US</h1>
        <p>bla bla </p>
      </div>
    </div>
  )
}
