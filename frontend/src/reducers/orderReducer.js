import { ALL_ERROR_CLEAR, NEW_ORDER_FAIL, NEW_ORDER_REQUEST, NEW_ORDER_SUCCESS } from "../constants/orderConstant";

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