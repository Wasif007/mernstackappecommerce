
import {ALL_ERROR_CLEAR,ALL_PRODUCT_REQUEST,ALL_PRODUCT_SUCCESS,ALL_PRODUCT_FAIL, ONE_PRODUCT_SUCCESS, ONE_PRODUCT_FAIL, ONE_PRODUCT_REQUEST} from "../constants/productConstant"

//All products get reducer
export const productReducer=(state={products:[]},action)=>{
switch (action.type) {
    case ALL_PRODUCT_SUCCESS:
        return{
            loading:false,
            products:action.payload.fetchAllProducts,
            productCount:action.payload.productCount
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
export const oneProductReducer=(state={product:{}},action)=>{
    switch (action.type) {
        case ONE_PRODUCT_SUCCESS:
            return{
                loading:false,
                product:action.payload.fetchAllProducts,
            }
            case ONE_PRODUCT_FAIL:
            return{
                loading:false,
                error:action.payload
            }
            case ONE_PRODUCT_REQUEST:
            return{
                loading:true,
                ...state
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