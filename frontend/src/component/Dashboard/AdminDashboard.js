import React from 'react'
import Sidebar from "./Sidebar.js"
import MetaData from "../layout/MetaData.js";
import {Link} from 'react-router-dom'

import "./AdminDashboard.css"
const AdminDashboard = () => {
  return (
    <div className="dashboard">
      <MetaData title="Dashboard - Admin Panel" />
      <Sidebar />
      <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> ₹2000
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>Product</p>
              <p>50</p>
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
  )
}

export default AdminDashboard
