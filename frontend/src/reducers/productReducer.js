
import {ALL_ERROR_CLEAR,ALL_PRODUCT_REQUEST,ALL_PRODUCT_SUCCESS,ALL_PRODUCT_FAIL, ONE_PRODUCT_SUCCESS, ONE_PRODUCT_FAIL, ONE_PRODUCT_REQUEST, REVIEW_PRODUCT_REQUEST, REVIEW_SUCCESS, REVIEW_PRODUCT_FAIL, REVIEW_PRODUCT_RESET, ADMIN_PRODUCT_FAIL, ADMIN_PRODUCT_SUCCESS, ADMIN_PRODUCT_REQUEST, ADMIN_PRODUCT_CREATE_REQUEST, ADMIN_PRODUCT_CREATE_SUCCESS, ADMIN_PRODUCT_CREATE_FAIL, ADMIN_PRODUCT_CREATE_RESET} from "../constants/productConstant"

//All products get reducer
export const productReducer=(state={products:[]},action)=>{
switch (action.type) {
    case ALL_PRODUCT_SUCCESS:
        return{
            loading:false,
            products:action.payload.fetchAllProducts,
            productCount:action.payload.numOfProducts,
            resultPerPage:action.payload.numberOfProducts,
            count:action.payload.count,
        }
        case ALL_PRODUCT_FAIL:
          case ADMIN_PRODUCT_FAIL:
        return{
            loading:false,
            error:action.payload
        }
        case ADMIN_PRODUCT_SUCCESS:
          return {
            loading:false,
            products:action.payload
          }
        case ALL_PRODUCT_REQUEST:
          case ADMIN_PRODUCT_REQUEST:
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
//All products get reducer for admin
export const allProductReducer=(state={productsadmin:[]},action)=>{
  switch (action.type) {
            case ADMIN_PRODUCT_FAIL:
          return{
              loading:false,
              error:action.payload
          }
          case ADMIN_PRODUCT_SUCCESS:
            return {
              loading:false,
              products:action.payload
            }
            case ADMIN_PRODUCT_REQUEST:
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
  //Review Posting reducer
export const reviewPostingReducer = (state = {}, action) => {
  switch (action.type) {
    case REVIEW_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
        
      };
    case REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload,
      };
    case REVIEW_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
      case REVIEW_PRODUCT_RESET:
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

  //Product Creating Admin reducer
  export const productCreatingAdminReducer = (state = { productCreateAdmin: {} }, action) => {
    switch (action.type) {
      case ADMIN_PRODUCT_CREATE_REQUEST:
        return {
          ...state,
          loading: true,
          
        };
      case ADMIN_PRODUCT_CREATE_SUCCESS:
        return {
          ...state,
          loading: false,
          product:action.payload,
          success: action.payload,
        };
      case ADMIN_PRODUCT_CREATE_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
        case ADMIN_PRODUCT_CREATE_RESET:
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