import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Messages = () => {

    const messages = useSelector(state => state.chatbot.messages)
    const [butres , setButres] = useState("")
    const [butres1 , setButres1] = useState("")
    const [butres2 , setButres2] = useState("")
    // console.log("butres "+ butres)
    
    // console.log("messages ", messages);
    
    // const finalRound = () =>{
    //     if(round == '2'){
    //         document.getElementById("finalround").style.display = "block";
    //         return <div class="messages_text_df">
    //             Dear Customer! Next one is the final negotiation round!
    //         </div>
    //     }
    // }
    const firstbuttonpress = (message) =>{
        var difference = message.text - message.useroffer;
       // window.location.reload(false);
       if(butres1 == '1'){
           document.getElementById("end").style.display = "block";
           document.getElementById('buttonstyyes').setAttribute("disabled","disabled");
           document.getElementById('buttonstyno').setAttribute("disabled","disabled");
           document.getElementById("buttonstyyes").style.backgroundColor = "grey";
           document.getElementById("buttonstyno").style.backgroundColor = "grey";

           var final_price = localStorage.getItem("counteroffer");
           localStorage.setItem("final_price",final_price);
           localStorage.removeItem("round")
           localStorage.removeItem("counteroffer")
           // setButres("")
           return <div class="messages_text_df">
           Item added to cart!
       </div>
       }
       else if (butres1 == '0' && difference<=10){
           document.getElementById("end").style.display = "block";
           document.getElementById('buttonstyyes').setAttribute("disabled","disabled");
           document.getElementById('buttonstyno').setAttribute("disabled","disabled");
           document.getElementById("buttonstyyes").style.backgroundColor = "grey";
           document.getElementById("buttonstyno").style.backgroundColor = "grey";

           // localStorage.removeItem("round")
           // localStorage.removeItem("counteroffer")
           // setButres("")
       return <div>
           <div class="messages_text_df">
           Dear customer! You can avail this product at Rs {message.useroffer}.<br></br>
            Do you want to proceed?<br></br>
            <span>
                <button  onClick={()=>setButres2(1)} value={butres2} id="buttonstyyes2" >Yes</button>
            <button  onClick={()=>setButres2(0)} value={butres2} id="buttonstyno2" >No</button>
            </span>
           </div>
            <div id="end2" class="messages_text_df" style={{display:"none", marginTop:"10px"}}>
                {buttonpress2(message)}
            </div>
       </div>
       }
       else if (butres1 == '0' && difference>10){
        document.getElementById("end").style.display = "block";
        document.getElementById('buttonstyyes').setAttribute("disabled","disabled");
        document.getElementById('buttonstyno').setAttribute("disabled","disabled");
        document.getElementById("buttonstyyes").style.backgroundColor = "grey";
        document.getElementById("buttonstyno").style.backgroundColor = "grey";

        // localStorage.removeItem("round")
        // localStorage.removeItem("counteroffer")
        // setButres("")
    return <div class="messages_text_df">
         Dear customer! Your chance for negotiation is now over!
    </div>
    }
       else{
           return
       }
       
       
   }
    const buttonpress = () =>{
        var round = localStorage.getItem("round");
        // window.location.reload(false);
        if(butres == '1'){
            
            document.getElementById("end").style.display = "block";
            document.getElementById('buttonstyyes').setAttribute("disabled","disabled");
            document.getElementById('buttonstyno').setAttribute("disabled","disabled");
            document.getElementById("buttonstyyes").style.backgroundColor = "grey";
            document.getElementById("buttonstyno").style.backgroundColor = "grey";

            var final_price = localStorage.getItem("counteroffer");
            localStorage.setItem("final_price",final_price);
            localStorage.removeItem("round")
            localStorage.removeItem("counteroffer")
            // setButres("")
            return <div>
            Item added to cart!
        </div>
        }
        else if (butres == '0' && round == '3'){
            console.log("haii")
            document.getElementById("end").style.display = "block";
            document.getElementById('buttonstyyes').setAttribute("disabled","disabled");
            document.getElementById('buttonstyno').setAttribute("disabled","disabled");
            document.getElementById("buttonstyyes").style.backgroundColor = "grey";
            document.getElementById("buttonstyno").style.backgroundColor = "grey";

            // localStorage.removeItem("round")
            // localStorage.removeItem("counteroffer")
            // setButres("")
            return <div>
             Dear customer! Your chance for negotiation is now over!
        </div>
        }
        else if (butres == '0' && round < parseInt('3')){
            document.getElementById("end").style.display = "block";
            document.getElementById('buttonstyyes').setAttribute("disabled","disabled");
            document.getElementById('buttonstyno').setAttribute("disabled","disabled");
            document.getElementById("buttonstyyes").style.backgroundColor = "grey";
            document.getElementById("buttonstyno").style.backgroundColor = "grey";

            return <div>
             Dear customer! Please enter a price!
        </div>
        }
        else{
            return
        }
        
        
    }
    //at round end
    const buttonpress2 = (message) =>{  
        // window.location.reload(false);
        if(butres2 == '1'){
            console.log("yes")
            document.getElementById("end2").style.display = "block";
            document.getElementById('buttonstyyes2').setAttribute("disabled","disabled");
            document.getElementById('buttonstyno2').setAttribute("disabled","disabled");
            document.getElementById("buttonstyyes2").style.backgroundColor = "grey";
            document.getElementById("buttonstyno2").style.backgroundColor = "grey";

            localStorage.setItem("final_price",message.useroffer);
            localStorage.removeItem("round")
            localStorage.removeItem("counteroffer")
            // setButres("")
            return <div >
            Item added to cart!
        </div>
        }
        else if (butres2 == '0'){
            console.log("haii")
            document.getElementById("end2").style.display = "block";
            document.getElementById('buttonstyyes2').setAttribute("disabled","disabled");
            document.getElementById('buttonstyno2').setAttribute("disabled","disabled");
            document.getElementById("buttonstyyes2").style.backgroundColor = "grey";
            document.getElementById("buttonstyno2").style.backgroundColor = "grey";


            // localStorage.removeItem("round")
            // localStorage.removeItem("counteroffer")
            // setButres("")
            return <div>
             Dear customer! Your chance for negotiation is now over!
        </div>
        }
        else{
            return
        }
        
        
    }
    const item_display = (message)=>{
        let df_intent = message.intent
        localStorage.setItem("item",message.item)
        if(df_intent== "product_search"){
            return <button type='submit' class="prod_btn">
                <Link to="/products">{message.item}</Link>
            </button>
        }
        // if(df_intent== "accept_negprice"){
        //     return <div>
        //         <span>
        //         <button  onClick={()=>buttonRes(1)}>Yes</button>
        //     <button type='submit' onClick={()=>buttonRes(0)}>No</button>
        //     </span>
        //         </div>
            
        // }
    }
    const pricedisplay = () =>{

            var finalprice = localStorage.getItem("counteroffer");
        return<div >
            <div class="messages_text_df">
            Are you sure you want to proceed with Rs {finalprice}?
            <br></br>
            <span>
                <button  onClick={()=>setButres(1)} value={butres} id="buttonstyyes">Yes</button>
            <button  onClick={()=>setButres(0)} value={butres} id="buttonstyno">No</button>
            </span>
            </div>
            <div id="end" class="messages_text_df" style={{display:"none", marginTop:"10px"}}>
                {buttonpress()}
            </div>
            
        </div>

        
    }
    // const roundEnd = () =>{
    //     if(localStorage.getItem("roundend") == true){
    //         return <div>
    //            Dear customer! Your chance for negotiation is now over!
    //         </div>
    //     }
    // }

    const displayMessage = (message, index)=>{
        if(message.speak == "user"){
            return  <div key={index} class ="messages_user">
                        <div class ="messages_text_user">{message.text}</div>
                    </div>
        }
        else if (message.speak == "bot" && message.counter == "no" && typeof(message.item)!= 'boolean'){
            return <div>
                <div key={index} class="messages_df">
                        <div class="messages_text_df">{message.text}</div>
                </div>
                <div>{item_display(message)}</div>
            </div>
             
        }
        else if (message.speak == "bot" && message.counter == "no" && typeof(message.item)== 'boolean'){
            return <div>
                <div key={index} class="messages_df">
                        {/* <div class="messages_text_df">{message.text}</div> */}
                </div>
                <div>{pricedisplay()}</div>
            </div>
             
        }
        else if(message.speak == "bot" && message.counter == "yes" && message.round < 2){
            localStorage.setItem("counteroffer",message.text)
            return <div>
                <div key={index} class="messages_df">
                        <div class="messages_text_df">How about Rs {message.text} ?</div>
                </div>
                {/* <div id = "finalround"style={{display:"none"}}>{finalRound()}</div> */}
            </div>
        }
        else if(message.speak == "bot" && message.counter == "yes" && message.round == 2){
            localStorage.setItem("counteroffer",message.text)
            return <div>
                <div key={index} class="messages_df">
                        <div class="messages_text_df">How about Rs {message.text} ?</div>
                </div>
                <div class="messages_text_df" >Dear Customer! Next round will be the final negotiation round<br></br></div>
            </div>
        }
        else if(message.speak == "bot" && message.counter == "yes" && message.round == 3){
            // localStorage.setItem("counteroffer",message.text)
            return <div>
                {/* <div >
            <div class="messages_text_df">
            Are you sure you want to proceed with Rs {finalprice}?
            <br></br>
            <span>
                <button  onClick={()=>setButres(1)} value={butres} id="buttonstyyes">Yes</button>
            <button  onClick={()=>setButres(0)} value={butres} id="buttonstyno">No</button>
            </span>
            </div>
            <div id="end" class="messages_text_df" style={{display:"none", marginTop:"10px"}}>
                {buttonpress()}
            </div>
            
        </div> */}
                <div key={index} >
                    {/* <div class="messages_df"> */}
                    <div class="messages_text_df">How about Rs {message.text} ?
                        <span>
                            <button  onClick={()=>setButres1(1)} value={butres1} id="buttonstyyes">Yes</button>
                            <button  onClick={()=>setButres1(0)} value={butres1} id="buttonstyno">No</button>
                        </span>
                        </div>
                        <div id="end"  style={{display:"none", marginTop:"10px"}}>
                       {firstbuttonpress(message)}
                       </div>
                    {/* </div> */}
                        
                       
                </div>
            </div>
        }
        
    }
    

    return(
        <div class="messages"> 
            {
                messages.map((message, index)=> {
                return displayMessage(message, index)
            })}
        </div>
    )
}

export default Messages