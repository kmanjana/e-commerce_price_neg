import React, { useEffect, useState } from 'react'
import '../styles/ProductDetail.css'
import {Link } from "react-router-dom"
// import { useNavigate } from 'react-router';
// import Button from 'react-bootstrap/Button'
// import { FaPlus } from "react-icons/fa";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row"
import Image from 'react-bootstrap/Image'
import Category from './Category'
import Button from 'react-bootstrap/Button'


function ProductDetail() {
    let [disabled , showDisabled] = useState();
    
    const userLoggedin = ()=>{
      if(localStorage.getItem("shop_ID")){
        showDisabled(false)
      }
      else{
        showDisabled(true)
      }
    }
    useEffect( () =>{
        userLoggedin();
        } , [] )

    function showProd(){
        let prod_details = localStorage.getItem('product_Details');
        if(prod_details){
            return JSON.parse(prod_details);
        }
        else{
            return []
        }
  } 
  const setBrandName = (brandname) =>{
    console.log("brandname is "+ brandname);
    localStorage.setItem("brand_name",brandname);

  }
  return (
    <div>
        <Category/>
        <Row>
            <Col md={6}><Image src={showProd().img} fluid="true" className="imgstyle" style={{height:"40rem",width:"39rem"}} alt='Not available'/></Col>
            <Col style={{fontFamily:"'Poppins', sans-serif"}} md={6}>
                   <h2 className='prodname'>{showProd().p_name}</h2>
                   <Link to="/prodbybrand" style={{textDecoration:"none"}} onClick={()=>setBrandName(showProd().brand)}>Visit {showProd().brand} Store</Link>
                   <br></br><br></br><br></br>
                   <Row>
                       <Col className='title'>Price</Col>
                       <Col>{showProd().price}</Col>
                   </Row>
                   <Row>
                       <Col className='title'>Brand</Col>
                       <Col>{showProd().brand}</Col>
                   </Row>
                   <br></br>
                   <Row>
                       <Col className='title'>About this item</Col><br></br>
                    </Row>
                       <pre style={{whiteSpace: "pre-wrap"}}>{showProd().description}</pre>
                       <Button disabled={disabled} style={{backgroundColor:"rgb(93 56 54)",border:"none"}}>Negotiate Price</Button>
                   
            </Col>
        </Row>
      
    </div>
  )
}

export default ProductDetail
