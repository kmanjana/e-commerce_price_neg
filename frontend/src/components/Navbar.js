import React from 'react';
import Logo from "../assets/logo-social.png";
import { Link } from "react-router-dom";
///import ReorderIcon from '@mui/icons-material/Reorder';
// import Button from "@material-ui/core/Button";
// import Menu from "@material-ui/core/Menu";
// import MenuItem from "@material-ui/core/MenuItem";
import '../styles/Navbar.css';

function Navbar() {

  return (
    <div className="navbar">
        <div className='leftSide'>
            <img src= {Logo} />
        </div>
        <div className='rightSide'>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            {/* <Link to="/customer">Customer</Link> */}
            <div class="dropdown">
            <button class="dropbtn">Accounts</button>
            <div class="dropdown-content">
            
           <div class="test"><Link to="/signup">Shopkeeper Register</Link></div>
            <div class="test"><Link to="/Regisuser" >Customer Register</Link></div>
            <div class="test"><Link to="/logshop">Shopkeeper Login</Link></div>
            <div class="test"><Link to="/loguser" >Customer Login</Link></div>
            
             </div>
             
            </div>
            <Link to="/contact">Contact</Link>
           
        </div>
    </div>
  )
}

export default Navbar;