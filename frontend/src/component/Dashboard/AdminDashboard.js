import React, {  useEffect } from "react";
import Sidebar from "./Sidebar.js"
import MetaData from "../layout/MetaData.js";
import {Link} from 'react-router-dom'
import { Doughnut, Line } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import {
  
  getAllProductsForAdmin,
} from "../../actions/productAction";
import "./AdminDashboard.css"
import { Typography} from "@mui/material";

const AdminDashboard = () => {
  let outOfStock = 0;
  const dispatch = useDispatch();
  
    const {  products } = useSelector((state) => state.adminAllProducts);
  
  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    dispatch(getAllProductsForAdmin());
    }, [dispatch]);
    const doughnutState = {
      labels: ["Out of Stock", "InStock"],
      datasets: [
        {
          backgroundColor: ["#00A6B4", "#6800B4"],
          hoverBackgroundColor: ["#4B5000", "#35014F"],
          data: [outOfStock, 10],
        },
      ],
    };
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
              <p>4</p>
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
