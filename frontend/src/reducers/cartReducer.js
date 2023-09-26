import { ADD_TO_CART, REMOVE_FROM_CART, SHIPPING_TO_CART } from "../constants/cartConstant";

//Add to Cart Reducer
export const addToCartReducer = (state = { cartItem: [],shippingInfo:{} }, action) => {

 switch (action.type) {
      case ADD_TO_CART:
        const item=action.payload;

        const ifItemExist=state.cartItem.find(
            (i)=>i.product===item.product
        )
       if(ifItemExist){
        return{
          ...state,
          cartItem:state.cartItem.map(
            (i)=>i.product===ifItemExist.product?item:i
          )
        }
       }else{
        return{
          ...state,
          cartItem:[...state.cartItem,item]
        }
       }
       case REMOVE_FROM_CART:
        return {
          ...state,
          cartItem:state.cartItem.filter((i)=>i.product!==action.payload)
        }
      case SHIPPING_TO_CART:
        return{
          ...state,
          shippingInfo:action.payload
        }
    
      default:
        return state;
    }
}