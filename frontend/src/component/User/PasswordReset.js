import React, { Fragment, useState, useEffect } from "react";
import "./PasswordReset.css";
import Loader from "../layout/Loader/Loading";
import { useDispatch, useSelector } from "react-redux";
import { resetPasswordUser } from "../../actions/userAction";
import MetaData from "../layout/MetaData";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import JSAlert from 'js-alert'

const PasswordReset = () => {
    const navigate = useNavigate();

    const [email,setEmail]=useState("");
    const dispatch=useDispatch();
    const {loading,message,success}=useSelector(state=>state.passwordReset);
    const resetPasswordSubmit=(e)=>{
        e.preventDefault();
      
        const myForm =new FormData();
        myForm.set("email",email);
        dispatch(resetPasswordUser(myForm));

    }
    useEffect(() => {
      if (success) {
        JSAlert.alert(message);
          console.log(success);
        }
        
       
       
     
  }, [success]);
   
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Update Profile" />
          <div className="resetPasswordContainer">
            <div className="resetPasswordBox">
              <h2 className="resetPasswordHeading">Reset Password</h2>

              <form
                className="resetPasswordForm"
                onSubmit={resetPasswordSubmit}
              >
                
                <div className="resetPasswordEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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

export default PasswordReset
