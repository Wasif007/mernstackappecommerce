import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loading";
import { Link, useNavigate } from 'react-router-dom';
import "./ProfileUser.css"

const ProfileUser = () => {
    const {userFetched,isAuthenticated,loading}=useSelector(state=>state.user);
    
    const navigate=useNavigate();
    useEffect(() => {
        if(!isAuthenticated){
         navigate("/login");
        }
      }, [isAuthenticated,navigate]);
  return (
   <Fragment>
    {
        loading?<Loader/>: <Fragment>
        <MetaData title={`${userFetched.name}'s Profile`} />
        <div className="profileContainer">
          <div>
            <h1>My Profile</h1>
            <img src={userFetched.avatar.url} alt={userFetched.name} />
            <Link to="/me/update">Edit Profile</Link>
          </div>
          <div>
            <div>
              <h4>Full Name</h4>
              <p>{userFetched.name}</p>
            </div>
            <div>
              <h4>Email</h4>
              <p>{userFetched.email}</p>
            </div>
            <div>
              <h4>Joined On</h4>
              <p>{String(userFetched.createdAt).substr(0, 10)}</p>
            </div>
    
            <div>
              <Link to="/orders">My Orders</Link>
              <Link to="/password/update">Change Password</Link>
            </div>
          </div>
        </div>
      </Fragment>
    }
   </Fragment>
  )
}

export default ProfileUser
