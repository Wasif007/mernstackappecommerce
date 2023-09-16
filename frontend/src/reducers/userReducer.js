
import {LOGIN_FAIL,LOGIN_REQUEST,LOGIN_SUCCESS,ALL_ERROR_CLEAR,REGISTER_FAIL,REGISTER_REQUEST,REGISTER_SUCCESS} from "../constants/userConstant"

//Login Request reducer
export const loginReducer=(state={user:{}},action)=>{
switch (action.type) {
    case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
        return{
            ...state,
            loading:false,
            isAuthenticated:true,
            userFetched:action.payload,
        }
        case LOGIN_FAIL:
            case REGISTER_FAIL:
        return{
            loading:false,
            isAuthenticated:false,
            user:null,
            ...state,
            error:action.payload
        }
        case LOGIN_REQUEST:
             case REGISTER_REQUEST:
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
