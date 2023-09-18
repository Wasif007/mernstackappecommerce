
import {LOGIN_FAIL,LOGIN_REQUEST,LOGIN_SUCCESS,ALL_ERROR_CLEAR, REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAIL, ME_USER_REQUEST, ME_USER_SUCCESS, ME_USER_FAIL, ME_USER_LOGOUT_SUCCESS, ME_USER_LOGOUT_FAIL, ME_USER_UPDATE_REQUEST, ME_USER_UPDATE_SUCCESS, ME_USER_UPDATE_FAIL} from "../constants/userConstant"
import axios from "axios";

//Post of User Login Request
export const loginUser = (email,password) => async (dispatch) => {
    try {
      dispatch({ type: LOGIN_REQUEST });
      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.post(`/api/v1/login`,{email,password},config);
      
      dispatch({
        type: LOGIN_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: LOGIN_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  //Post of User Register Request
export const registerUser = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_REQUEST });
    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.post(`/api/v1/registeruser`,userData,config);
    
    dispatch({
      type: REGISTER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Single ME user fetch
export const meUserDetails = () => async (dispatch) => {
  try {
    dispatch({ type: ME_USER_REQUEST });
   
    const { data } = await axios.get(`/api/v1/me`);
    
    dispatch({
      type: ME_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ME_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Logout Me user
export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: ME_USER_REQUEST });
   
   await axios.get(`/api/v1/logout`);
    
    dispatch({
      type: ME_USER_LOGOUT_SUCCESS,
      
    });
  } catch (error) {
    dispatch({
      type: ME_USER_LOGOUT_FAIL,
      payload: error.response.data.message,
    });
  }
};
  //Put of User Profile Updata Request
  export const profileUpdateUser = (userData) => async (dispatch) => {
    try {
      dispatch({ type: ME_USER_UPDATE_REQUEST });
      const config = { headers: { "Content-Type": "multipart/form-data" } };
  
      const { data } = await axios.put(`/api/v1/me/update`,userData,config);
      
      dispatch({
        type: ME_USER_UPDATE_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: ME_USER_UPDATE_FAIL,
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