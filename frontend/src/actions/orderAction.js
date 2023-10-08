import axios from "axios";
import {  ADMIN_ORDER_DELETE_FAIL, ADMIN_ORDER_DELETE_REQUEST, ADMIN_ORDER_DELETE_SUCCESS, ADMIN_ORDER_FAIL, ADMIN_ORDER_REQUEST, ADMIN_ORDER_SUCCESS, ADMIN_ORDER_UPDATE_FAIL, ADMIN_ORDER_UPDATE_REQUEST, ADMIN_ORDER_UPDATE_SUCCESS, ALL_ERROR_CLEAR, MY_ORDER_FAIL, MY_ORDER_REQUEST, MY_ORDER_SUCCESS, NEW_ORDER_FAIL, NEW_ORDER_REQUEST, NEW_ORDER_SUCCESS, SINGLE_ORDER_FAIL, SINGLE_ORDER_REQUEST, SINGLE_ORDER_SUCCESS } from "../constants/orderConstant";

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

  //Delete Single Order details Admin
export const deleteSingleOrderAdmin = (id) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_ORDER_DELETE_REQUEST });
    const { data } = await axios.delete(`/api/v1/order/status/${id}`);
    dispatch({
      type: ADMIN_ORDER_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_ORDER_DELETE_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Updating a Order details Admin
export const updateSingleOrderAdmin = (id,orderData) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_ORDER_UPDATE_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.put(`/api/v1/order/status/${id}`,orderData,config);
    console.log("Order Data",orderData);
    console.log(data);
    dispatch({
      type: ADMIN_ORDER_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_ORDER_UPDATE_FAIL,
      payload: error.response.data.message,
    });
  }
};
  // Get All Orders For Admin Panel
  export const getAllOrdersForAdmin = () => async (dispatch) => {
    try {
      dispatch({ type: ADMIN_ORDER_REQUEST });
  const { data } = await axios.get("/api/v1/orderforadmin");
      dispatch({
        type: ADMIN_ORDER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ADMIN_ORDER_FAIL,
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