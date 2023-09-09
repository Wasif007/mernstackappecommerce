import {ALL_ERROR_CLEAR,ALL_PRODUCT_REQUEST,ALL_PRODUCT_SUCCESS,ALL_PRODUCT_FAIL} from "../constants/productConstant"
import axios from "axios";

// Get All Products For Admin
export const getAdminProduct = () => async (dispatch) => {
    try {
      dispatch({ type: ALL_PRODUCT_REQUEST });
  
      const { data } = await axios.get("/api/v1/admin/products");
  
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