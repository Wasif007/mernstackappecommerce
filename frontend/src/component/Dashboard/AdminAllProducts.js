import React, { Fragment, useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid/DataGrid';
import "./AdminAllProducts.css";
import { useSelector, useDispatch } from "react-redux";
import {
  
  deleteSingleProductAdmin,
  getAllProductsForAdmin,
} from "../../actions/productAction";
import { Link } from "react-router-dom";
import MetaData from "../layout/MetaData";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SideBar from "./Sidebar";
import { Button } from "@mui/material";
import { ADMIN_PRODUCT_DELETE_RESET, ALL_ERROR_CLEAR } from "../../constants/productConstant";
import { useNavigate } from 'react-router-dom';

import JSAlert from 'js-alert'


const AdminAllProducts = () => {

    const dispatch = useDispatch();
    const navigate=useNavigate();
    const {  error,products } = useSelector((state) => state.adminAllProducts);
 const {message, error: deleteError, isDeleted } = useSelector(
    (state) => state.adminProductDelete
  );
    useEffect(() => {
      if (error) {
        JSAlert.alert(error);
        dispatch(ALL_ERROR_CLEAR());
      }
  
      if (deleteError) {
        JSAlert.alert(deleteError);
        dispatch(ALL_ERROR_CLEAR());
      }
  
      if (isDeleted) {
        JSAlert.alert(message);
        navigate("/admin/dashboard");
        dispatch({ type: ADMIN_PRODUCT_DELETE_RESET });
      }
  
      dispatch(getAllProductsForAdmin());
    }, [dispatch, error, deleteError, navigate, isDeleted]);
  
    
    const deleteProductFunction=(id)=>{
      console.log(id);
      dispatch(deleteSingleProductAdmin(id));
    }
    const columns = [
        { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },
    
        {
          field: "name",
          headerName: "Name",
          minWidth: 350,
          flex: 1,
        },
        {
          field: "stock",
          headerName: "Stock",
          type: "number",
          minWidth: 150,
          flex: 0.3,
        },
    
        {
          field: "price",
          headerName: "Price",
          type: "number",
          minWidth: 270,
          flex: 0.5,
        },
    
        {
          field: "actions",
          flex: 0.3,
          headerName: "Actions",
          minWidth: 150,
          type: "number",
          sortable: false,
          renderCell: (params) => {
            return (
              <Fragment>
                
                <Link to={`/show/admin/product/${params.id}`}>
                <EditIcon />
        </Link>
                <Button 
                onClick={() =>
                  deleteProductFunction(params.id)
                }
              
                >
                  <DeleteIcon />
                </Button>
              </Fragment>
            );
          },
        },
      ];
      const rows = [];

  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.Stock,
        price: item.price,
        name: item.name,
      });
    });
    
  return (
    <Fragment>
    <MetaData title={`ALL PRODUCTS - Admin`} />

    <div className="dashboard">
      <SideBar />
      <div className="productListContainer">
        <h1 id="productListHeading">ALL PRODUCTS</h1>

        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          className="productListTable"
          autoHeight
        />
      </div>
    </div>
  </Fragment>
  )
}

export default AdminAllProducts
