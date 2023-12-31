import axios from "axios";
import { ADD_TO_CART, REMOVE_FROM_CART } from "../constants/cartConstant";



//Add to Cart Request
export const addtoCart = (id,quantity) => async (dispatch,getState) => {
   
  
      const { data } = await axios.get(`/api/v1/product/${id}`);
      dispatch({
        type: ADD_TO_CART,
        payload: {
            product:data.productTFind._id,
            name:data.productTFind.name,
            price:data.productTFind.price,
            image:data.productTFind.images[0].url,
            Stock:data.productTFind.Stock,
            quantity
        },
      });
      localStorage.setItem("cartItem",JSON.stringify(getState().cart.cartItem))
   
  };
  //Remove from Cart Request
export const removeFromCart = (id) => async (dispatch,getState) => {
   
  
  dispatch({
    type: REMOVE_FROM_CART,
    payload:id,
  });
  localStorage.setItem("cartItem",JSON.stringify(getState().cart.cartItem))

};
  //Shipping to address Request
  export const shippingCart = (data) => async (dispatch) => {
   
    dispatch({
      type: REMOVE_FROM_CART,
      payload:data,
    });
    localStorage.setItem("shippingInfo",JSON.stringify(data))
  
  };