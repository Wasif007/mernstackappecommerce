
import {LOGIN_FAIL,LOGIN_REQUEST,LOGIN_SUCCESS,ALL_ERROR_CLEAR,REGISTER_FAIL,REGISTER_REQUEST,REGISTER_SUCCESS,ME_USER_FAIL,ME_USER_REQUEST,ME_USER_SUCCESS, ME_USER_LOGOUT_SUCCESS, ME_USER_LOGOUT_FAIL, ME_USER_UPDATE_SUCCESS, ME_USER_UPDATE_FAIL, ME_USER_UPDATE_REQUEST, ME_USER_UPDATE_RESET, ME_USER_UPDATE_PASSWORD_SUCCESS, ME_USER_UPDATE_PASSWORD_FAIL, ME_USER_UPDATE_PASSWORD_REQUEST, ME_USER_UPDATE_PASSWORD_RESET, ME_USER_RESET_PASSWORD_REQUEST, ME_USER_RESET_PASSWORD_FAIL, ME_USER_RESET_PASSWORD_SUCCESS, ME_USER_RESET_TOKEN_PASSWORD_FAIL, ME_USER_RESET_TOKEN_PASSWORD_REQUEST, ME_USER_RESET_TOKEN_PASSWORD_SUCCESS, ALL_USERS_REQUEST, ALL_USERS_SUCCESS, ALL_USERS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL, UPDATE_USER_SUCCESS, DELETE_USER_SUCCESS, UPDATE_USER_REQUEST, DELETE_USER_REQUEST, DELETE_USER_RESET, UPDATE_USER_RESET, UPDATE_USER_FAIL, DELETE_USER_FAIL} from "../constants/userConstant"

//Login Request reducer
export const loginReducer=(state={user:{}},action)=>{
switch (action.type) {
    
        
            case ME_USER_SUCCESS:
        return{
            ...state,
            loading:false,
            isAuthenticated:true,
            userFetched:action.payload.user,
            message:action.payload.message,
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
                error:action.payload.message

            }
            
        case LOGIN_FAIL:
            return{
                ...state,
                loading:false,
                isAuthenticated:false,
                user:null,
                
                error:action.payload
            }
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
            isAuthenticated:false,
            error:action.payload
        }

        case ALL_ERROR_CLEAR:
        return{
...state,
error:null
        }
    default:
        return state;
}}

//Login Request reducer
export const profileUpdateUserReducer=(state={},action)=>{
    switch (action.type) {
     
                case ME_USER_UPDATE_SUCCESS:
                    case ME_USER_UPDATE_PASSWORD_SUCCESS:
                        case UPDATE_USER_SUCCESS:
            return{
                ...state,
                loading:false,
                isUpdated:action.payload,
            }
            case DELETE_USER_SUCCESS:
                return{
                    ...state,
                    loading: false,
                    isDeleted: action.payload.success,
                    message: action.payload.message,
                }
            case ME_USER_UPDATE_FAIL:
                case ME_USER_UPDATE_PASSWORD_FAIL:
                    case UPDATE_USER_FAIL:
                        case DELETE_USER_FAIL:
                            
                return{
                    ...state,
                    loading:false,
                    error:action.payload
                }
                
                 case ME_USER_UPDATE_REQUEST:
                    case ME_USER_UPDATE_PASSWORD_REQUEST:
                        case UPDATE_USER_REQUEST:
                            case DELETE_USER_REQUEST:
            return{
                loading:true,
                ...state
            }
            case ME_USER_UPDATE_RESET:
                case ME_USER_UPDATE_PASSWORD_RESET:
                    case UPDATE_USER_RESET:
                return{
                    loading:false,
                    isUpdated:false
                }
                case DELETE_USER_RESET:
                    return {
                      ...state,
                      isDeleted: false,
                    };
            case ALL_ERROR_CLEAR:
            return{
    ...state,
    error:null
            }
        default:
            return state;
    }}

    //RESET PASSWORD REDUCER
export const passwordResetUserReducer=(state={},action)=>{
    switch (action.type) {
        case ME_USER_RESET_PASSWORD_SUCCESS:
            return{
                ...state,
                loading:false,
                message:action.payload.message,
                success:action.payload.success
                
            }
            case ME_USER_RESET_TOKEN_PASSWORD_SUCCESS:
                return {
                    ...state,
        loading: false,
        success: action.payload.success,
        message: action.payload.message   
                }
         
                case ME_USER_RESET_PASSWORD_FAIL:
                    case ME_USER_RESET_TOKEN_PASSWORD_FAIL:
                return{
                    ...state,
                    loading:false,
                    error:action.payload
                }
                
              
                    case ME_USER_RESET_PASSWORD_REQUEST:
                        case ME_USER_RESET_TOKEN_PASSWORD_REQUEST:
            return{
                loading:true,
                ...state,
                error:null
            }
           
            case ALL_ERROR_CLEAR:
            return{
    ...state,
    error:null
            }
        default:
            return state;
    }}

    export const allUsersReducer = (state = { users: [] }, action) => {
        switch (action.type) {
          case ALL_USERS_REQUEST:
            return {
              ...state,
              loading: true,
            };
          case ALL_USERS_SUCCESS:
            return {
              ...state,
              loading: false,
              users: action.payload,
            };
      
          case ALL_USERS_FAIL:
            return {
              ...state,
              loading: false,
              error: action.payload,
            };
      
          case ALL_ERROR_CLEAR:
            return {
              ...state,
              error: null,
            };
      
          default:
            return state;
        }
      };
      export const userDetailsReducer = (state = { user: {} }, action) => {
        switch (action.type) {
          case USER_DETAILS_REQUEST:
            return {
              ...state,
              loading: true,
            };
          case USER_DETAILS_SUCCESS:
            return {
              ...state,
              loading: false,
              user: action.payload,
            };
      
          case USER_DETAILS_FAIL:
            return {
              ...state,
              loading: false,
              error: action.payload,
            };
      
          case ALL_ERROR_CLEAR:
            return {
              ...state,
              error: null,
            };
      
          default:
            return state;
        }
      };
      