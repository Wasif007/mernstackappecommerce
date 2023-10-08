import React, {  useEffect } from "react";
import Sidebar from "./Sidebar.js"
import MetaData from "../layout/MetaData.js";
import {Link} from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import {
  
  getAllProductsForAdmin,
} from "../../actions/productAction";
import "./AdminDashboard.css"
import { Typography} from "@mui/material";
import { getAllOrdersForAdmin } from "../../actions/orderAction.js";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  
    const {  products } = useSelector((state) => state.adminAllProducts);
    const { orders } = useSelector((state) => state.adminAllOrders);
  

  useEffect(() => {
    dispatch(getAllProductsForAdmin());
    dispatch(getAllOrdersForAdmin());
    }, [dispatch]);
    
  return (
    <div className="dashboard">
      <MetaData title="Dashboard - Admin Panel" />
      <Sidebar />

      <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>

        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> $2000
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/show/all/admin/products">
              <p>Product</p>
              <p>{products && products.length}</p>
            </Link>
            
            <Link to="/admin/orders">
              <p>Orders</p>
              <p>{orders && orders.length}</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>2</p>
            </Link>
          </div>
        </div>

      
      </div>
    </div>
  )
}

export default AdminDashboard
