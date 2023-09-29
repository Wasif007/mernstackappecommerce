import { ALL_ERROR_CLEAR, MY_ORDER_FAIL, MY_ORDER_REQUEST, MY_ORDER_SUCCESS, NEW_ORDER_FAIL, NEW_ORDER_REQUEST, NEW_ORDER_SUCCESS, SINGLE_ORDER_FAIL, SINGLE_ORDER_REQUEST, SINGLE_ORDER_SUCCESS } from "../constants/orderConstant";

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
          loading: true,
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