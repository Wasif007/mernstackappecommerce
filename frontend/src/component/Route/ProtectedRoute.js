import React from 'react'
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { Navigate } from "react-router-dom";


const ProtectedRoute = ({ element: Element, ...rest }) => {

    const { loading, isAuthenticated } = useSelector(state => state.user);
          
    if (loading) {
        return <h2>Loading...</h2>
    }
    return isAuthenticated ? <Outlet/> : <Navigate to="/login" />;      
  
  }


export default ProtectedRoute
