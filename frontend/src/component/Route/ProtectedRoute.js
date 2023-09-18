import React, { Fragment } from 'react'
import { useSelector } from 'react-redux';
import { Outlet, Route } from 'react-router-dom';
import { Navigate } from "react-router-dom";


const ProtectedRoute = ({ element: Element, ...rest }) => {

    const { loading, isAuthenticated, userFetched } = useSelector(state => state.user);
          
    if (loading) {
        return <h2>Loading...</h2>
    }
    return isAuthenticated ? <Outlet/> : <Navigate to="/login" />;      
  
  }

// const ProtectedRoute = ({component:Component,...rest}) => {
//     const {userFetched,isAuthenticated,loading}=useSelector(state=>state.user);
//   return (
//     <Fragment>
//       {loading === false && (
//         <Route
//           {...rest}
//           render={(props) => {
//             if (isAuthenticated === false) {
//               return <Navigate replace to="/login" />;
//             }

           

//             return <Component {...props} />;
//           }}
//         />
//       )}
//     </Fragment>
    
//   )
// }

export default ProtectedRoute
