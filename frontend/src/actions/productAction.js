import {ALL_ERROR_CLEAR,ALL_PRODUCT_REQUEST,ALL_PRODUCT_SUCCESS,ALL_PRODUCT_FAIL, ONE_PRODUCT_REQUEST, ONE_PRODUCT_SUCCESS, ONE_PRODUCT_FAIL} from "../constants/productConstant"
import axios from "axios";

// Get All Products For Admin
export const getAdminProduct = (keywordFromParam="",currentPage=1,price=[0,25000]) => async (dispatch) => {
    try {
      dispatch({ type: ALL_PRODUCT_REQUEST });
  let link=`/api/v1/admin/products?keyword=${keywordFromParam}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}`;
      const { data } = await axios.get(link);
  
      dispatch({
        type: ALL_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };
//Clearing all errors
export const clearAllErrorFunc=()=>async(dispatch)=>{
dispatch({
    type:ALL_ERROR_CLEAR
})
}
//Get Single Product details
export const getSingleProductAdmin = (id) => async (dispatch) => {
  try {
    dispatch({ type: ONE_PRODUCT_REQUEST });

    const { data } = await axios.get(`/api/v1/product/${id}`);
    
    dispatch({
      type: ONE_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ONE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};