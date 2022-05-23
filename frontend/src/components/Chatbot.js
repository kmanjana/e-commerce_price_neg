import React, { useState } from "react";
import "../styles/sample.css"
import Plane from "../assets/paper-plane.png"
import Close from "../assets/close.png"
import Chat from "../assets/chat.png"
import Messages from "./Messages";
import { useDispatch, useSelector } from "react-redux";
import * as chatbotActions from '../store/actions/chatbotActions'

function Chatbot(){

//   const [responses, setResponses] = useState([])
  var proddetails = JSON.parse(localStorage.getItem("product_Details"))
  
  
  const [msg,setMsg]=useState("");
  const [round ,setRound]= useState(0);
  
  const dispatch = useDispatch()
  const openForm = (e) =>{
    document.getElementById("notif").style.display = "none";
    document.getElementById("chat-wrapper").style.minHeight= "550px";
    document.getElementById("chat-wrapper").style.opacity= "1";
    document.getElementById("chat-wrapper").style.transform= "translate3d(0px, 0px, 0px) scale(1, 1)";
    document.getElementById("chat-wrapper").style.transition= "transform 0.8s ease, opacity 0.8s ease-in"; 
    // console.log("hi");
}

const closeForm = (e)=>{
    document.getElementById("chat-wrapper").style.minHeight= "0";
    document.getElementById("chat-wrapper").style.opacity= "0";
    document.getElementById("chat-wrapper").style.transform= "translateX(25%) translateY(35%) scale(0.5, 0.5)";
    document.getElementById("chat-wrapper").style.transition= "transform 0.8s ease, opacity 0.8s ease-in, height 0s ease 0.8s"; 
}
const notification = (e) =>{
  document.getElementById("notif").style.display = "inline-flex";
  document.getElementById("notif").classList.toggle('visible');
}
//to close notification
const closeNotif = (e) =>{
  
  document.getElementById("notif").style.display = "none";
}
//to send data to backend
// localStorage.setItem("round",round)

const chat =  (e) => {
  //stop the form from refreshing the page on submit
  e.preventDefault();
  //clear the input box
  setMsg('') 

let data;
  try{
    var d =parseFloat(msg.match(/\d+/)[0])
    if(d){
      var r = round+1
      setRound(r)
      // var rn = localStorage.getItem("round");
      console.log("round is ", r);
      
      // console.log(maxp)
      localStorage.setItem("round",r)
        if(r<=3){
          
          if(r==1){
            localStorage.setItem("roundend",false)
            data = {
              command: "counteroffer",
              text: msg,
              useroffer: d,
              maxprice: proddetails.price,
              minprice: proddetails.minprice,
              round :r
            }
            // dispatch(chatbotActions.textQueryAction(data))
          }
          else {
            localStorage.setItem("roundend",false)
            var counteroffer = localStorage.getItem("counteroffer");
            console.log("counter", counteroffer);

          // console.log("maxp", maxp);
          data = {
            command: "counteroffer",
            text: msg,
            useroffer: d,
            maxprice: counteroffer ,
            minprice: proddetails.minprice,
            round :r
          }
          }
          
          dispatch(chatbotActions.textQueryAction(data))
        }  
       
       
          else{
            console.log("r is ", r);
          localStorage.setItem("roundend",true)
          }
          
      
      }
     
  }
  catch{
    data = {
      command: "other",
      text: msg
    } 
    dispatch(chatbotActions.textQueryAction(data))
  }
  // console.log(typeof(data.text));
    
  // dispatch(chatbotActions.textQueryAction(data))
}


    return(
      <div>
      <button class="open-button" onClick={openForm} onLoad={notification}><img src={Chat} alt="no image available"/></button>
      <div id="notif">Hello
     <div id="close" onClick={closeNotif}><img src={Close} class="close-notif" alt="no image available"/></div>
      </div>
        <div id="chat-wrapper">
            <div class="titlebar">
                <div class="title-wrapper">
                    <div id="dfTitlebar">Chatbot</div>
                    <div id="close" onClick={closeForm}><img src={Close} class="close-form" alt="no image available"/></div>
                </div>
            </div>
            <div class="message-list">
                <div class="message-list-wrapper">
                    <div class="error"></div>
                    <div id="messageList">
                        <Messages />
                    </div>
                </div>
            </div>
            <div class="user-input">
                <div class="input-container">
                    <div class="check-input"></div>
                    <form class="input-box-wrapper" onSubmit={chat}>
                        <input type="text"  placeholder="Ask something...." value={msg} required onChange={(e)=> {setMsg(e.target.value);}}></input>
                        <button type="submit" ><img src={Plane} id="sendIcon"></img></button>
                    </form>
                </div>
            </div>
        </div>
        </div>
    )
}
export default Chatbot