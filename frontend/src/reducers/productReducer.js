
import {ALL_ERROR_CLEAR,ALL_PRODUCT_REQUEST,ALL_PRODUCT_SUCCESS,ALL_PRODUCT_FAIL} from "../constants/productConstant"


export const productReducer=(state={product:[]},action)=>{
switch (action.type) {
    case ALL_PRODUCT_SUCCESS:
        return{
            loading:false,
            product:action.payload.products,
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
            product:[]
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