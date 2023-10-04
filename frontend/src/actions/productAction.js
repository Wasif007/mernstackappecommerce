import {ALL_ERROR_CLEAR,ALL_PRODUCT_REQUEST,ALL_PRODUCT_SUCCESS,ALL_PRODUCT_FAIL, ONE_PRODUCT_REQUEST, ONE_PRODUCT_SUCCESS, ONE_PRODUCT_FAIL, REVIEW_PRODUCT_REQUEST, REVIEW_SUCCESS, REVIEW_PRODUCT_FAIL, ADMIN_PRODUCT_REQUEST, ADMIN_PRODUCT_SUCCESS, ADMIN_PRODUCT_CREATE_REQUEST, ADMIN_PRODUCT_CREATE_SUCCESS, ADMIN_PRODUCT_CREATE_FAIL, ADMIN_PRODUCT_DELETE_REQUEST, ADMIN_PRODUCT_DELETE_SUCCESS, ADMIN_PRODUCT_DELETE_FAIL, ADMIN_PRODUCT_UPDATE_REQUEST, ADMIN_PRODUCT_UPDATE_SUCCESS, ADMIN_PRODUCT_UPDATE_FAIL} from "../constants/productConstant"
import axios from "axios";

// Get All Products For Admin
export const getAdminProduct = (keywordFromParam="",currentPage=1,price=[0,25000],category,ratings=0) => async (dispatch) => {
    try {
      dispatch({ type: ALL_PRODUCT_REQUEST });
  let link=`/api/v1/admin/products?keyword=${keywordFromParam}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;
  if(category){
     link=`/api/v1/admin/products?keyword=${keywordFromParam}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;

  } 
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

  // Get All Products For Admin Panel
export const getAllProductsForAdmin = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_PRODUCT_REQUEST });
const { data } = await axios.get("/api/v1/show/all/admin/products");
    dispatch({
      type: ADMIN_PRODUCT_SUCCESS,
      payload: data.products,
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
//Delete Single Product details Admin
export const deleteSingleProductAdmin = (id) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_PRODUCT_DELETE_REQUEST });
    const { data } = await axios.delete(`/api/v1/admin/product/${id}`);
    dispatch({
      type: ADMIN_PRODUCT_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCT_DELETE_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Updating a Single Product details Admin
export const updateSingleProductAdmin = (id,productData) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_PRODUCT_UPDATE_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.put(`/api/v1/admin/product/${id}`,productData,config);
    dispatch({
      type: ADMIN_PRODUCT_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCT_UPDATE_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Review Submitting
export const reviewPostingAction = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: REVIEW_PRODUCT_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(`/api/v1/product/ratings`,reviewData,config);

    dispatch({
      type: REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: REVIEW_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Product Creating Admin Route
export const productCreatingAdminAction = (productData) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_PRODUCT_CREATE_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(`/api/v1/admin/new/product`,productData,config);

    dispatch({
      type: ADMIN_PRODUCT_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCT_CREATE_FAIL,
      payload: error.response.data.message,
    });
  }
};