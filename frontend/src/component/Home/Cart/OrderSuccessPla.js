import React from "react";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import "./OrderSucessPla.css";
import { Typography} from "@mui/material";
import { Link } from "react-router-dom";
const OrderSuccessPla = () => {
    return (
        <div className="orderSuccess">
          <CheckCircleIcon />
    
          <Typography>Your Order has been Placed successfully </Typography>
          <Link to="/myorder">View Orders</Link>
        </div>
      );
}



export default OrderSuccessPla
