import React, {useEffect,useState} from 'react'
// import 'bootstrap/dist/css/bootstrap.min.css';  
import {Container,Row ,Card, Col, Button} from 'react-bootstrap';
// import '../styles/displayProd.css'

import Axios from 'axios'


function DisplayProduct() {

  let [prods,setProducts]= useState([]);
  // const [p_name,setProd_name]=useState("");
  // const [price,setPrice]= useState("")
  // const [img,setImg]=useState("");
  // const [brand,setBrand]= useState("")
  // const [description,setDesc]=useState("");
  // const [catg_name,setCat]=useState("");
  // const [subcatg_name,setSubCat]= useState("")
  useEffect( ()=>{
    prod_display()
  },[])

  function refreshPage() {
    // window.location.reload(false);
    prod_display();
  }
  const prod_display = ()=>{
    const item_n = localStorage.getItem("item");
    console.log("local",item_n);
    Axios.post("http://localhost:3002/displayProd",{
      item: item_n 
    }).then((response)=>{
      setProducts(response.data)
      console.log(prods[2].p_name)
      // card_display(prod)
    })
    
        // card_display(prod[i]);
      
  }

  // const card_display =


  return (
    <div class="grid">
      <div style={{fontFamily:"serif",fontWeight: "bold", fontSize:"24px", borderRadius:"25px" }}>Showing Results for "{localStorage.getItem("item")}" ({prods.length})
        <Button variant='light' onClick={refreshPage}>Reload</Button>
      </div>
      <Container className='p-4'>
        <Row xs={2} md={4}>
        {prods.map((prod=>
          <Col>
            <Card key={prod.pid}>
              <div style={{display:"flex",justifyContent:"center", alignItems:"center"}}>
            <Card.Img class="img" variant="top" src={prod.img} style={{height:"180px"  }}/>
            </div>
            <Card.Body style={{backgroundColor: "rgb(247,247,247)"}}>
              <div class="card-text-body" >
              <Card.Title>{prod.p_name}</Card.Title>
            <Card.Subtitle>
                <Col>{prod.subcatg_name}</Col>
              
              </Card.Subtitle>
            <Card.Text>
            <Row md={2}  style={{margin:"2px"}}>
            <Col>₹{prod.price}</Col>
            <Col md={{offset: -2}}><Button variant="success">Negotiate</Button></Col>
            </Row>
              
            </Card.Text>
            <Row md={2}  style={{margin:"2px"}}>
            <Col><Button variant="danger">Buy Now</Button></Col>
            <Col md={{offset: -2}}><Button variant="warning" >Add to Cart</Button></Col>
            </Row>
            
              </div>
            </Card.Body>
            </Card>
          </Col>))}
          </Row>
      </Container>
      
    </div>
  )
}

export default DisplayProduct
