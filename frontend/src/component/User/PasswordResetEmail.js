import React, { Fragment, useState, useEffect } from "react";
import "./PasswordReset.css";
import Loader from "../layout/Loader/Loading";
import { useDispatch, useSelector } from "react-redux";
import { resetPasswordMailUser } from "../../actions/userAction";
import MetaData from "../layout/MetaData";
import JSAlert from 'js-alert'
import LockOpenIcon from '@mui/icons-material/LockOpen';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { useNavigate, useParams } from 'react-router-dom'

const PasswordResetEmail = () => {
  let keywordFromParam=useParams();
  const navigate = useNavigate();

    const [password,setPassword]=useState("");
    const [confirmPassword,setConfirmPassword]=useState("");
    const dispatch=useDispatch();
    const {loading,message,success}=useSelector(state=>state.passwordReset);
    const resetPasswordSubmit=(e)=>{
        e.preventDefault();
      
        const myForm =new FormData();
        myForm.set("password",password);
        myForm.set("confirmPassword",confirmPassword);

        dispatch(resetPasswordMailUser(keywordFromParam.token,myForm));

    }
    useEffect(() => {
      if (success) {
        JSAlert.alert(message);
        navigate("/login");

      }

     
  }, [success,message,navigate]);
  return (
    <Fragment>
    {loading ? (
      <Loader />
    ) : (
      <Fragment>
        <MetaData title="Change Password" />
        <div className="resetPasswordContainer">
          <div className="resetPasswordBox">
            <h2 className="resetPasswordHeading">Update Profile</h2>

            <form
              className="resetPasswordForm"
              onSubmit={resetPasswordSubmit}
            >
              <div>
                <LockOpenIcon />
                <input
                  type="password"
                  placeholder="New Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="loginPassword">
                <MailOutlineIcon />
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
                className="resetPasswordBtn"
              />
            </form>
          </div>
        </div>
      </Fragment>
    )}
  </Fragment>
  )
}

export default PasswordResetEmail
