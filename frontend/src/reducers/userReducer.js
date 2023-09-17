
import {LOGIN_FAIL,LOGIN_REQUEST,LOGIN_SUCCESS,ALL_ERROR_CLEAR,REGISTER_FAIL,REGISTER_REQUEST,REGISTER_SUCCESS,ME_USER_FAIL,ME_USER_REQUEST,ME_USER_SUCCESS, ME_USER_LOGOUT_SUCCESS, ME_USER_LOGOUT_FAIL} from "../constants/userConstant"

//Login Request reducer
export const loginReducer=(state={user:{}},action)=>{
switch (action.type) {
    
        
            case ME_USER_SUCCESS:
        return{
            ...state,
            loading:false,
            isAuthenticated:true,
            userFetched:action.payload.user,
        }
        case REGISTER_SUCCESS:
            return{
                ...state,
                loading:false,
                isAuthenticated:true,
                userFetched:action.payload.userCreated,
            }
        case LOGIN_SUCCESS:
            return{
                ...state,
                loading:false,
                isAuthenticated:true,
                userFetched:action.payload.findingUserWEmail,
            }
        case ME_USER_LOGOUT_SUCCESS:
            return {
                loading:false,
                user:null,
                isAuthenticated:false
            }
        case ME_USER_LOGOUT_FAIL:
            return{
                ...state,
                loading:false,
                error:action.payload

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
        case ME_USER_FAIL:
            return{
                loading:false,
                isAuthenticated:false,
                user:null,
                error:action.payload
            }
        case LOGIN_REQUEST:
            case ME_USER_REQUEST:
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
