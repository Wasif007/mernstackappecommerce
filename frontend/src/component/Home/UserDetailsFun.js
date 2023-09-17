import React, { Fragment, useState } from 'react'

import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import DashBoard from "@mui/icons-material/Dashboard"
import PersonIcon from "@mui/icons-material/Person"
import ExitToAppIcon from "@mui/icons-material/ExitToApp"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../actions/userAction';
import "./UserDetailsfun.css"
import { Backdrop } from '@mui/material';
const UserDetailsFun = ({user}) => {
  const dispatch=useDispatch();
  const [open,setOpen]=useState(false);
 
  const actions = [
    { icon: <PersonIcon />, name: 'Profile',func:account },
    { icon: <ExitToAppIcon />, name: 'Logout',func:exitApp },
    { icon: <ShoppingCartIcon />, name: 'Shopping Cart',func:shoppingCart },
  ];
      if(user.role==="admin"){
       actions.unshift( { icon: <DashBoard />, name: 'DashBoard',func:dashBoard })
     }
  const navigate = useNavigate();
  function account(){
navigate("/profile");
}
function exitApp(){
   dispatch(logout());
 
}
function shoppingCart(){
  navigate("/shoppingcart");
}
function dashBoard(){
  navigate("/dashboard");
}

  return (

    <Fragment>
      <Backdrop open={open} style={{zIndex:"10"}}/>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        onClose={()=>setOpen(false)}
        onOpen={()=>setOpen(true)}
        open={open}
        style={{ zIndex: "11" }}
        className='speedDial'
        direction='down'
        icon={<img
        className='speedDialIcon'
        src={user.avatar.url?user.avatar.url:"/Profile.png"}
        alt='User'
        />}
      >
         {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.func}
          />
        ))} 
      </SpeedDial>
    </Fragment>
  )
}

export default UserDetailsFun
