import React, { Fragment, useState, useEffect } from "react";
import "./PasswordUserUpdate.css";
import Loader from "../layout/Loader/Loading";
import { useDispatch, useSelector } from "react-redux";
import { meUserDetails, passwordUpdateUser } from "../../actions/userAction";
import {ME_USER_UPDATE_PASSWORD_RESET} from "../../constants/userConstant";
import MetaData from "../../component/layout/MetaData";
import  LockOpen from "@mui/icons-material/LockOpen"
import LockIcon from "@mui/icons-material/Lock"
import VpnKeyIcon from "@mui/icons-material/VpnKey"
import { useNavigate } from "react-router-dom";

const PasswordUserUpdate = () => {
    const navigate = useNavigate();
    const [oldPassword,setOldPassword]=useState("");
    const [newPassword,setNewPassword]=useState("");
    const [confirmPassword,setConfirmPassword]=useState("");
     const dispatch=useDispatch();
    const {loading,isUpdated}=useSelector(state=>state.profileUpdate);
    
    useEffect(() => {
        
         
          if (isUpdated) {
           
            navigate("/account");
      
            dispatch({
              type: ME_USER_UPDATE_PASSWORD_RESET,
            });
        }
       
    }, [dispatch,navigate,isUpdated]);
    const updatePasswordSubmit=(e)=>{
        e.preventDefault();
      
        const myForm =new FormData();
        myForm.set("oldPassword",oldPassword);
        myForm.set("newPassword",newPassword);
        myForm.set("confirmPassword",confirmPassword);
        dispatch(passwordUpdateUser(myForm));

    }
   
  return (
    <Fragment>
    {loading ? (
      <Loader />
    ) : (
      <Fragment>
        <MetaData title="Update Profile" />
        <div className="updatePasswordContainer">
          <div className="updatePasswordBox">
            <h2 className="updatePasswordHeading">Update Profile</h2>

            <form
              className="updatePasswordForm"
              encType="multipart/form-data"
              onSubmit={updatePasswordSubmit}
            >
               <div className="loginPassword">
                          <VpnKeyIcon />
                          <input
                            type="password"
                            placeholder="Old Password"
                            required
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                          />
                        </div>
                        <div className="loginPassword">
                          <LockOpen />
                          <input
                            type="password"
                            placeholder="New Password"
                            required
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                          />
                        </div>
                        <div className="loginPassword">
                          <LockIcon />
                          <input
                            type="password"
                            placeholder="Confirm Password"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                          />
                        </div>
             

            
              <input
                type="submit"
                value="Update"
                className="updatePasswordBtn"
              />
            </form>
          </div>
        </div>
      </Fragment>
    )}
  </Fragment>
  )
}

export default PasswordUserUpdate
