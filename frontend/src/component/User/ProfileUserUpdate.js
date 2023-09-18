import React, { Fragment, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import FaceIcon from '@mui/icons-material/Face';
import "./ProfileUserUpdate.css";
import { useSelector,useDispatch } from 'react-redux';
import {profileUpdateUser, meUserDetails} from "../../actions/userAction"
import Loader from '../layout/Loader/Loading';
import {   ME_USER_UPDATE_RESET } from '../../constants/userConstant';
import MetaData from '../layout/MetaData';

const ProfileUserUpdate = () => {
    const navigate = useNavigate();

    const [avatar,setAvatar]=useState();
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [avatarPreview,setAvatarPreview]=useState("./Profile.png");
    const dispatch=useDispatch();
    const {userFetched}=useSelector(state=>state.user);
    const {loading,isUpdated}=useSelector(state=>state.profileUpdate);
    
    useEffect(() => {
        if (userFetched) {
            setName(userFetched.name);
            setEmail(userFetched.email);
            setAvatarPreview(userFetched.avatar.url);
          }
          console.log("useEffect");

         
          if (isUpdated) {
            dispatch(meUserDetails());
      console.log("updated");
            navigate("/account");
      
            dispatch({
              type: ME_USER_UPDATE_RESET,
            });
        }
        if (!isUpdated) {
            
            navigate("/me/update");
        
        }
    }, [dispatch,navigate,userFetched,isUpdated]);
    const updateProfileSubmit=(e)=>{
        e.preventDefault();
        console.log("submit");
        const myForm =new FormData();
        myForm.set("name",name);
        myForm.set("email",email);
        myForm.set("avatar",avatar);
        dispatch(profileUpdateUser(myForm));

    }
    const updateProfileChange=(e)=>{
        if (e.target.name === "avatar") {
            const reader = new FileReader();
      
            reader.onload = () => {
              if (reader.readyState === 2) {
                setAvatarPreview(reader.result);
                setAvatar(reader.result);
              }
            };
      
            reader.readAsDataURL(e.target.files[0]);
          } 
    }
   
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Update Profile" />
          <div className="updateProfileContainer">
            <div className="updateProfileBox">
              <h2 className="updateProfileHeading">Update Profile</h2>

              <form
                className="updateProfileForm"
                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
              >
                <div className="updateProfileName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="updateProfileEmail">
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

                <div id="updateProfileImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProfileChange}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="updateProfileBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

export default ProfileUserUpdate
