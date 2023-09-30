import React from 'react'
import Sidebar from "./Sidebar.js"
import MetaData from "../layout/MetaData.js";
import "./AdminDashboard.css"
const AdminDashboard = () => {
  return (
    <div className="dashboard">
      <MetaData title="Dashboard - Admin Panel" />
      <Sidebar />
    </div>
  )
}

export default AdminDashboard
