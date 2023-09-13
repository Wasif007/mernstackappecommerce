
import {ALL_ERROR_CLEAR,ALL_PRODUCT_REQUEST,ALL_PRODUCT_SUCCESS,ALL_PRODUCT_FAIL, ONE_PRODUCT_SUCCESS, ONE_PRODUCT_FAIL, ONE_PRODUCT_REQUEST} from "../constants/productConstant"

//All products get reducer
export const productReducer=(state={products:[]},action)=>{
switch (action.type) {
    case ALL_PRODUCT_SUCCESS:
        return{
            loading:false,
            products:action.payload.fetchAllProducts,
            productCount:action.payload.numOfProducts,
            resultPerPage:action.payload.numberOfProducts,
        }
        case ALL_PRODUCT_FAIL:
        return{
            loading:false,
            error:action.payload
        }
        case ALL_PRODUCT_REQUEST:
        return{
            loading:true,
            products:[]
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
//Single product get reducer
export const oneProductReducer = (state = { productDetails: {} }, action) => {
    switch (action.type) {
      case ONE_PRODUCT_REQUEST:
        return {
          loading: true,
          ...state,
        };
      case ONE_PRODUCT_SUCCESS:
        return {
          loading: false,
          productDetails: action.payload.productTFind,
        };
      case ONE_PRODUCT_FAIL:
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