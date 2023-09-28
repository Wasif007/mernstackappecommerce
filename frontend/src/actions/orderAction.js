import axios from "axios";
import { ALL_ERROR_CLEAR, NEW_ORDER_FAIL, NEW_ORDER_REQUEST, NEW_ORDER_SUCCESS } from "../constants/orderConstant";

  //Posting a order Action
  export const newOrderCreationAction = (order) => async (dispatch) => {
    try {
      dispatch({ type:  NEW_ORDER_REQUEST});
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post(`/api/v1/order/new`,order,config);
      dispatch({
        type: NEW_ORDER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: NEW_ORDER_FAIL,
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