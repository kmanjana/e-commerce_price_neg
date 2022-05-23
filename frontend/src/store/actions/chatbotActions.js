import Axios from "axios";

export const UPDATE_MESSAGE = "UPDATE_MESSAGE";
export const UPDATE_USER_MESSAGE = "UPDATE_USER_MESSAGE";
export const COUNTER_OFFER = "COUNTER_OFFER";

export const textQueryAction = (data) =>{ 
    return async dispatch => {
            dispatch({ type: UPDATE_USER_MESSAGE, data: data })
            if(data.command == 'other'){
                const responses = await Axios.post("http://localhost:3002/chat_in",{
                    command:data.command,
                    text:data.text,
                    userName: "athu123"
                    })
                console.log("response",responses.data)
                return dispatch({ type: UPDATE_MESSAGE, data: responses.data })
            }
            else if(data.command == 'counteroffer'){
                console.log("data is " + data.maxprice)
                const responses = await Axios.post("http://localhost:3002/chat_in",{
                    command:data.command,
                    text:data.text,
                    useroffer:data.useroffer,
                    maxprice: data.maxprice,
                    minprice: data.minprice,
                    round : data.round,
                    userName: "athu123"
                    })
                console.log("response counter is ",responses.data.counter_offer)
                return dispatch({ type: COUNTER_OFFER, data: responses.data })
            }
            
            
        
        
    }
}