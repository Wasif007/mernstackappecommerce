import { ADMIN_ORDER_CREATE_FAIL, ADMIN_ORDER_CREATE_REQUEST, ADMIN_ORDER_CREATE_RESET, ADMIN_ORDER_CREATE_SUCCESS, ADMIN_ORDER_DELETE_FAIL, ADMIN_ORDER_DELETE_REQUEST, ADMIN_ORDER_DELETE_RESET, ADMIN_ORDER_DELETE_SUCCESS, ADMIN_ORDER_FAIL, ADMIN_ORDER_REQUEST, ADMIN_ORDER_SUCCESS, ADMIN_ORDER_UPDATE_FAIL, ADMIN_ORDER_UPDATE_REQUEST, ADMIN_ORDER_UPDATE_RESET, ADMIN_ORDER_UPDATE_SUCCESS, ALL_ERROR_CLEAR, MY_ORDER_FAIL, MY_ORDER_REQUEST, MY_ORDER_SUCCESS, NEW_ORDER_FAIL, NEW_ORDER_REQUEST, NEW_ORDER_SUCCESS, SINGLE_ORDER_FAIL, SINGLE_ORDER_REQUEST, SINGLE_ORDER_SUCCESS } from "../constants/orderConstant";

//Order Placing reducer
export const orderPlaceReducer = (state = { orderInfo: {} }, action) => {
    switch (action.type) {
      case NEW_ORDER_REQUEST:
        return {
            ...state,
          loading: true,
        };
      case NEW_ORDER_SUCCESS:
        return {
          loading: false,
          order: action.payload,
        };
      case  NEW_ORDER_FAIL:
        return {
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

  //My all orders reducer
export const myOrderReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case MY_ORDER_REQUEST:
      return {
        loading: true,
      };

    case MY_ORDER_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };

    case MY_ORDER_FAIL:
      return {
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
}

//Order Deleting Admin reducer
export const orderDeletingAdminReducer = (state = { orderDelete: {} }, action) => {
  switch (action.type) {
    case ADMIN_ORDER_DELETE_REQUEST:
      case ADMIN_ORDER_UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADMIN_ORDER_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted:action.payload.success,
        message:action.payload.message
      };
      case ADMIN_ORDER_UPDATE_SUCCESS:
        return{
          ...state,
          loading:false,
          isUpdated:action.payload.success,
          message:action.payload.message
        }
    case ADMIN_ORDER_DELETE_FAIL:
      case ADMIN_ORDER_UPDATE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
      case ADMIN_ORDER_DELETE_RESET:
        
        return{
          ...state,
          loading:false,
          isDeleted:false
        }
      case ADMIN_ORDER_UPDATE_RESET:
        return {
          ...state,
          loading:false,
          isUpdated:false
        }
    case ALL_ERROR_CLEAR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

//ORDER Update Admin reducer
export const orderUpdatingAdminReducer = (state = { orderUpdate: {} }, action) => {
  switch (action.type) {
      case ADMIN_ORDER_UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    
      case ADMIN_ORDER_UPDATE_SUCCESS:
        return{
          ...state,
          loading:false,
          isUpdated:action.payload.success,
          message:action.payload.message
        }
    
      case ADMIN_ORDER_UPDATE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
      
      case ADMIN_ORDER_UPDATE_RESET:
        return {
          ...state,
          loading:false,
          isUpdated:false
        }
    case ALL_ERROR_CLEAR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
//Order Creating Admin reducer
export const productCreatingAdminReducer = (state = { orderCreateAdmin: {} }, action) => {
  switch (action.type) {
    case ADMIN_ORDER_CREATE_REQUEST:
      return {
        ...state,
        loading: true,
        
      };
    case ADMIN_ORDER_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        product:action.payload.product,
        success: action.payload.success,
      };
    case ADMIN_ORDER_CREATE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
      case ADMIN_ORDER_CREATE_RESET:
        return{
          ...state,
          loading:false,
          success:false
        }

    case ALL_ERROR_CLEAR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
//All orders get reducer for admin
export const allOrderReducer=(state={ordersadmin:[]},action)=>{
  switch (action.type) {
            case ADMIN_ORDER_FAIL:
          return{
              loading:false,
              error:action.payload
          }
          case ADMIN_ORDER_SUCCESS:
            return {
              loading:false,
              orders:action.payload.orderDetails
            }
            case ADMIN_ORDER_REQUEST:
          return{
              loading:true,
              orders:[]
          }
  
          case ALL_ERROR_CLEAR:
          return{
  ...state,
  error:null
          }
      default:
          return state;
  }
  
  };
  //Single order front reducer
  export const singleOrderFrontReducer = (state = { order: {} }, action) => {
    switch (action.type) {
      case SINGLE_ORDER_REQUEST:
        return {
          loading: true,
        };
  
      case SINGLE_ORDER_SUCCESS:
        return {
          loading: false,
          order: action.payload,
        };
  
      case SINGLE_ORDER_FAIL:
        return {
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
  }