
import {LOGIN_FAIL,LOGIN_REQUEST,LOGIN_SUCCESS,ALL_ERROR_CLEAR, REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAIL} from "../constants/userConstant"
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
  //Clearing all errors
export const clearAllErrorFunc=()=>async(dispatch)=>{
    dispatch({
        type:ALL_ERROR_CLEAR
    })
    }