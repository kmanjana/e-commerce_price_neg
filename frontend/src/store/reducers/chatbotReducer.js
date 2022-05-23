import { UPDATE_MESSAGE, UPDATE_USER_MESSAGE, COUNTER_OFFER } from "../actions/chatbotActions";

const initialState ={
     messages : []
}

const chatbotReducer = (state = initialState, action) =>{
    switch (action.type) {
        case UPDATE_MESSAGE:    //action=> type, data {response, intent_name,parameter = nutraj}
            // console.log("reply",action.data.response)
            let message = {
                speak: "bot",
                text: action.data.response,
                intent: action.data.intent_name,
                item: action.data.parameter,
                counter: "no"
            }
            return {
                ...state, messages : [...state.messages, message]
            };
        case UPDATE_USER_MESSAGE:    //action=> type, data {text = nutraj}
            // console.log("inreducer",action.data)
            let messageUser = {
                speak: "user",
                text: action.data.text
            }
            return {
                ...state, messages : [...state.messages, messageUser]
            };
        case COUNTER_OFFER:    //action=> type, data {counter_offer}
            console.log("reply",action.data)
            let msg = {
                speak: "bot",
                text: action.data.counter_offer.toFixed(2),
                useroffer: action.data.user_offer,
                round: action.data.round,
                minprice : action.data.min_price,
                maxprice: action.data.max_price,
                counter: "yes"
            }
            return {
                ...state, messages : [...state.messages, msg]
            };
        default:
            return state;
    }
}

export default chatbotReducer