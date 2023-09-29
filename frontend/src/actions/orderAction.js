import axios from "axios";
import { ALL_ERROR_CLEAR, MY_ORDER_FAIL, MY_ORDER_REQUEST, MY_ORDER_SUCCESS, NEW_ORDER_FAIL, NEW_ORDER_REQUEST, NEW_ORDER_SUCCESS, SINGLE_ORDER_FAIL, SINGLE_ORDER_REQUEST, SINGLE_ORDER_SUCCESS } from "../constants/orderConstant";

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
  //Getting my order Action
  export const getOrderMeAction = (order) => async (dispatch) => {
    try {
      dispatch({ type:  MY_ORDER_REQUEST});
      const { data } = await axios.get(`/api/v1/myorder`);
      dispatch({
        type: MY_ORDER_SUCCESS,
        payload: data.orderDetails,
      });
    } catch (error) {
      dispatch({
        type: MY_ORDER_FAIL,
        payload: error.response.data.message,
      });
    }
  };

   //Single Order Detail  Action
   export const getSingleOrderMeAction = (id) => async (dispatch) => {
    try {
      dispatch({ type:  SINGLE_ORDER_REQUEST});
      const { data } = await axios.get(`/api/v1/orderdetails/${id}`);
      dispatch({
        type: SINGLE_ORDER_SUCCESS,
        payload: data.orderDetails,
      });
    } catch (error) {
      dispatch({
        type: SINGLE_ORDER_FAIL,
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