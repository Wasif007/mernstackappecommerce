import { ADD_TO_CART } from "../constants/cartConstant";

//Add to Cart Reducer
export const addToCartReducer = (state = { cartItem: [] }, action) => {

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
    
      default:
        return state;
    }
}