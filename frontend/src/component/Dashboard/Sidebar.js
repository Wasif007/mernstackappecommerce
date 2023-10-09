import React from "react";
import "./sidebar.css";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";
import PostAddIcon from '@mui/icons-material/PostAdd';
import AddIcon from '@mui/icons-material/Add';
import ListAltIcon from '@mui/icons-material/ListAlt';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import RateReviewIcon from '@mui/icons-material/RateReview';
const Sidebar = () => {
  return (
    <div className="sidebar">
    <Link to="/">
      <img src={logo} alt="Ecommerce" />
    </Link>
    <Link to="/admin/dashboard">
        <p>
          <DashboardIcon /> Dashboard
        </p>
      </Link>
      
      <Link to="/show/all/admin/products">
        <p>
          <PostAddIcon />
          All Products
        </p>
      </Link>
      
      <Link to="/show/admin/product">
        <p>
          <AddIcon />
          Create New Product
        </p>
      </Link>
      <Link to="/admin/orders">
        <p>
          <ListAltIcon />
          Orders
        </p>
      </Link>
      <Link to="/admin/allusers">
        <p>
          <PeopleIcon /> Users
        </p>
      </Link>
      <Link to="/admin/reviewslist">
        <p>
          <RateReviewIcon />
          Reviews
        </p>
      </Link>
    </div>
  )
}

export default Sidebar
