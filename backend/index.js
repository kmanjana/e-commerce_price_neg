const express = require("express");
const body_parser = require('body-parser');
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt")

const app = express();
app.use(cors());
app.use(body_parser.json());

const userReg = require("./Userindex")();//for conecting with index.js
app.use("/handleSubmits", userReg); 

app.use(express.json());
const chat_bot = require("./new")();
app.use("/webhook",chat_bot);

const test_bot = require("./chat")();
app.use("/chat_in",test_bot);

const getProd = require("./cust_getproduct")();
app.use("/getproducts",getProd);

const vendorfns = require("./vendor_fns")();
app.use("/vendor",vendorfns);

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "price_neg"
})

// app.post('/register', (req, res) =>{
//     const usern = req.body.username;
//     const shpname = req.body.shopname;

//     db.query("INSERT INTO shop (username,shop_name) VALUES (?,?)", [usern,shpname],
//     (err,result)=>{
//         console.log(result);
//         if(err){
//             return console.log(err);
//         }
//        res.send({result});
//     }
//     );   
// });

// app.post('/login', (req, res) =>{
//     const usern = req.body.username;

//     db.query("SELECT * FROM shop WHERE username = ?", [usern],
//     (err,result)=>{
//         console.log(result);
//         // console.log(result[0].shop_id)
//         // if(err){
//         //     return console.log(err);
//         // }
//         if(err){
//             res.send({err: err});
//         }
//         if(result.length>0){
//             //    res.send(result);
//             shopid= result[0].shop_id;
//            res.status(200).send({shopid}); 
//         }
        
//         else{
//             res.send({message: "wrong username"});
//         }
           
//     }
//     );   
// });
app.post('/handleSubmit', async(req, res) =>{//here handle submit given to indicate index.js
    
    console.log(req.body);
    const adm_name=req.body.adm_name;
    const shop_name=req.body.shop_name;
    const shop_addr=req.body.shop_addr;
    const email=req.body.email;
    const phno=req.body.phno;
    const username=req.body.username;
    const salt=await bcrypt.genSalt(10);
    const password=await bcrypt.hash(req.body.password,salt);
    // bcrypt.hash(password,saltRounds,fuction(err,hash){
    // // var hashedPassword = hash
    
    db.query("INSERT INTO shop(adm_name,shop_name,shop_addr,email,phno,username,password) VALUE (?,?,?,?,?,?,?)",
    [adm_name,shop_name,shop_addr,email,phno,username,password],
    (err,result)=>{
        console.log(result);
        if(err){
            return console.log(err);
        }
        res.send({result});
    }
    ); 
});  
// });

app.post('/login', async(req, res) =>{
    const username = req.body.username;
    const password=req.body.password;
  
    
    db.query("SELECT * FROM shop WHERE username = ? ",[username],
    async(err,result)=>{

        
        
        

        if(err){
            res.send({err: err});
        }
       
        if (result.length > 0)
         { const validp=  await bcrypt.compare(password,result[0].password);   
            
            if(validp==true)
              {
                console.log("---------> Login Successful");
                // res.send({ message: "Successful login" });
                shopid= result[0].shop_id;
                res.status(200).send({shopid}); 
                
              } 
       else {
         
            res.send({ message: "Password does not match" });
          }
        }
        else
        {
            res.send({ message: "User doesn't exist" });
        }
}
);
        
      
      
    });
        

app.post('/displayProd',(req,res)=>{
    console.log("helloooooooooooooooooooooooooo")
    const item = req.body.item;
    console.log(item);
    
    if(item=="products" || item=="product"){
        db.query("SELECT * FROM products p, category c, subcategory s WHERE ( p.catg_id = c.catg_id AND p.subcatg_id = s.subcatg_id )",
    (err,result)=>{
        // if(err){
        //     res.send({err: err});
        // }
        // else{
            console.log(result[1])
            res.send(result)
        
    })
    }
    else{
        db.query("SELECT * FROM products p, category c, subcategory s WHERE ( p.catg_id = c.catg_id AND p.subcatg_id = s.subcatg_id ) AND( p.p_name LIKE '%"+item+"%' OR c.catg_name LIKE '%"+item+"%' OR s.subcatg_name LIKE '%"+item+"%' )",
    (err,result)=>{
        if(err){
            res.send({err: err});
        }
        else{
            console.log(result.length)
            res.send(result)
        }
    })
    }
    

})

// app.get('/getproduct/:prodid', (req, res) =>{
//     const prod_id = req.params.prodid;
//     // console.log("shopid is " + shop_id );

//     db.query("SELECT * FROM products WHERE pid = ?", [prod_id],
//     (err,result)=>{
//         console.log(result);
//         if(err){
//             return console.log(err);
//         }
//         // usrname= result[0].username;
//         res.status(200).send({result});
//     }
//     );   
// });

// app.get('/getsubcatgname/:catid', (req, res) =>{
//     const cat_id = req.params.catid;

//     db.query("SELECT * FROM subcategory WHERE catg_id = ?", [cat_id],
//     (err,result)=>{
//         // console.log("category name " +JSON.parse(JSON.stringify(result)));
//         // resl=JSON.parse(JSON.stringify(result));
//         // console.log(resl);
//         if(err){
//             return console.log(err);
//         }
//         // usrname= result[0].username;
//         res.status(200).send({result});
//     }
//     );   
// });


const port = process.env.PORT || 3002;
app.listen(port,()=>{console.log("Server Ready at "+port)});