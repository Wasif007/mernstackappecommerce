
import {ALL_ERROR_CLEAR,ALL_PRODUCT_REQUEST,ALL_PRODUCT_SUCCESS,ALL_PRODUCT_FAIL, ONE_PRODUCT_SUCCESS, ONE_PRODUCT_FAIL, ONE_PRODUCT_REQUEST, REVIEW_PRODUCT_REQUEST, REVIEW_SUCCESS, REVIEW_PRODUCT_FAIL, REVIEW_PRODUCT_RESET, ADMIN_PRODUCT_FAIL, ADMIN_PRODUCT_SUCCESS, ADMIN_PRODUCT_REQUEST, ADMIN_PRODUCT_CREATE_REQUEST, ADMIN_PRODUCT_CREATE_SUCCESS, ADMIN_PRODUCT_CREATE_FAIL, ADMIN_PRODUCT_CREATE_RESET, ADMIN_PRODUCT_DELETE_REQUEST, ADMIN_PRODUCT_DELETE_SUCCESS, ADMIN_PRODUCT_DELETE_FAIL, ADMIN_PRODUCT_DELETE_RESET, ADMIN_PRODUCT_UPDATE_REQUEST, ADMIN_PRODUCT_UPDATE_FAIL, ADMIN_PRODUCT_UPDATE_SUCCESS, ADMIN_PRODUCT_UPDATE_RESET, ALL_REVIEW_REQUEST, ALL_REVIEW_SUCCESS, ALL_REVIEW_FAIL, DELETE_REVIEW_REQUEST, DELETE_REVIEW_SUCCESS, DELETE_REVIEW_FAIL, DELETE_REVIEW_RESET} from "../constants/productConstant"

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
//Product Deleting Admin reducer
export const productDeletingAdminReducer = (state = { productDelete: {} }, action) => {
  switch (action.type) {
    case ADMIN_PRODUCT_DELETE_REQUEST:
      case ADMIN_PRODUCT_UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADMIN_PRODUCT_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted:action.payload.success,
        message:action.payload.message
      };
      case ADMIN_PRODUCT_UPDATE_SUCCESS:
        return{
          ...state,
          loading:false,
          isUpdated:action.payload.success,
          message:action.payload.message
        }
    case ADMIN_PRODUCT_DELETE_FAIL:
      case ADMIN_PRODUCT_UPDATE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
      case ADMIN_PRODUCT_DELETE_RESET:
        
        return{
          ...state,
          loading:false,
          isDeleted:false
        }
      case ADMIN_PRODUCT_UPDATE_RESET:
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

//Product Update Admin reducer
export const productUpdatingAdminReducer = (state = { productUpdate: {} }, action) => {
  switch (action.type) {
      case ADMIN_PRODUCT_UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    
      case ADMIN_PRODUCT_UPDATE_SUCCESS:
        return{
          ...state,
          loading:false,
          isUpdated:action.payload.success,
          message:action.payload.message
        }
    
      case ADMIN_PRODUCT_UPDATE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
      
      case ADMIN_PRODUCT_UPDATE_RESET:
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
          product:action.payload.product,
          success: action.payload.success,
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

export const productReviewsReducer = (state = { reviews: [] }, action) => {
  switch (action.type) {
    case ALL_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ALL_REVIEW_SUCCESS:
      return {
        loading: false,
        reviews: action.payload,
      };
    case ALL_REVIEW_FAIL:
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

export const reviewReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    case DELETE_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_REVIEW_RESET:
      return {
        ...state,
        isDeleted: false,
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