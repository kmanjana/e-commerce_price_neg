import React from 'react'
import { useNavigate } from 'react-router';
import Button from '@mui/material/Button';

function Logout() {
    let navigate = useNavigate();
    const logout= ()=>{
        localStorage.removeItem("shop_ID");
        localStorage.removeItem("catg_Id");
        localStorage.removeItem("brand_name");
        localStorage.removeItem("product_Details");
        navigate("/login");
    }
  return (
    <div >
      <Button variant="contained" onClick={logout} style={{float:"right",backgroundColor:"brown"}}>LOGOUT</Button>
    </div>
  )
}

export default Logout
