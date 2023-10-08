
import {LOGIN_FAIL,LOGIN_REQUEST,LOGIN_SUCCESS,ALL_ERROR_CLEAR, REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAIL, ME_USER_REQUEST, ME_USER_SUCCESS, ME_USER_FAIL, ME_USER_LOGOUT_SUCCESS, ME_USER_LOGOUT_FAIL, ME_USER_UPDATE_REQUEST, ME_USER_UPDATE_SUCCESS, ME_USER_UPDATE_FAIL, ME_USER_UPDATE_PASSWORD_REQUEST, ME_USER_UPDATE_PASSWORD_SUCCESS, ME_USER_UPDATE_PASSWORD_FAIL, ME_USER_RESET_PASSWORD_REQUEST, ME_USER_RESET_PASSWORD_SUCCESS, ME_USER_RESET_PASSWORD_FAIL, ME_USER_RESET_TOKEN_PASSWORD_REQUEST, ME_USER_RESET_TOKEN_PASSWORD_SUCCESS, ME_USER_RESET_TOKEN_PASSWORD_FAIL, ALL_USERS_REQUEST, ALL_USERS_SUCCESS, ALL_USERS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAIL, DELETE_USER_REQUEST, DELETE_USER_SUCCESS, DELETE_USER_FAIL} from "../constants/userConstant"
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
   //Put of User Password Updata Request
   export const passwordUpdateUser = (password) => async (dispatch) => {
    try {
      dispatch({ type: ME_USER_UPDATE_PASSWORD_REQUEST });
      const config = { headers: { "Content-Type": "application/json" } };
  
      const { data } = await axios.put(`/api/v1/password/update`,password,config);
      
      dispatch({
        type: ME_USER_UPDATE_PASSWORD_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: ME_USER_UPDATE_PASSWORD_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  //Post of User Reset Password Request
export const resetPasswordUser = (email) => async (dispatch) => {
  try {
    dispatch({ type: ME_USER_RESET_PASSWORD_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(`/api/v1/reset/password`,email,config);
    
    dispatch({
      type: ME_USER_RESET_PASSWORD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ME_USER_RESET_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};
  //Post of User Reset Password Request Via Mail
  export const resetPasswordMailUser = (token,passwords) => async (dispatch) => {
    try {
      dispatch({ type: ME_USER_RESET_TOKEN_PASSWORD_REQUEST });
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.put(`/api/v1/reset/forgot/${token}`,passwords,config);
      dispatch({
        type: ME_USER_RESET_TOKEN_PASSWORD_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ME_USER_RESET_TOKEN_PASSWORD_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  // get All Users
export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_USERS_REQUEST });
    const { data } = await axios.get(`/api/v1/admin/allusers`);

    dispatch({ type: ALL_USERS_SUCCESS, payload: data.users });
  } catch (error) {
    dispatch({ type: ALL_USERS_FAIL, payload: error.response.data.message });
  }
};

// get  User Details
export const getUserDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/v1/admin/specificuser/${id}`);

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: USER_DETAILS_FAIL, payload: error.response.data.message });
  }
};

// Update User
export const updateUser = (id, userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(
      `/api/v1/admin/specificuser/${id}`,
      userData,
      config
    );

    dispatch({ type: UPDATE_USER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete User
export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_USER_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/specificuser/${id}`);

    dispatch({ type: DELETE_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
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