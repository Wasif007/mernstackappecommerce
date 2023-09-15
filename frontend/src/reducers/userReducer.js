
import {LOGIN_FAIL,LOGIN_REQUEST,LOGIN_SUCCESS,ALL_ERROR_CLEAR} from "../constants/userConstant"

//Login Request reducer
export const loginReducer=(state={user:{}},action)=>{
switch (action.type) {
    case LOGIN_SUCCESS:
        return{
            ...state,
            loading:false,
            isAuthenticated:true,
            user:action.payload,
        }
        case LOGIN_FAIL:
        return{
            loading:false,
            isAuthenticated:false,
            user:null,
            ...state,
            error:action.payload
        }
        case LOGIN_REQUEST:
        return{
            loading:true,
            isAuthenticated:false
        }

        case ALL_ERROR_CLEAR:
        return{
...state,
error:null
        }
    default:
        return state;
}}
