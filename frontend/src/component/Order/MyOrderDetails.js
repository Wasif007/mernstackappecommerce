import React, { Fragment, useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid/DataGrid';
import "./myOrdersDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getOrderMeAction } from "../../actions/orderAction";
import Loader from "../layout/Loader/Loading";
import { Link } from "react-router-dom";
import Typography from '@mui/material/Typography';
import MetaData from '../layout/MetaData';
import LaunchIcon from '@mui/icons-material/Launch';
const MyOrderDetails = () => {
  const dispatch = useDispatch();
  const { userFetched } = useSelector((state) => state.user);
  const {orders,loading}=useSelector((state)=>state.myOrder);
  useEffect(() => {
    dispatch(getOrderMeAction());
  }, [dispatch]);
  
  const columns=[
    {field:"id",headerName:"Order Id",minWidth:300,flex:0.7},
    {field:"itemsQty",headerName:"Quantity of Items",type:"number",minWidth:150,flex:0.5},
    {field:"status",headerName:"Status of Order",minWidth:150,flex:0.5,
    cellClassName:(params)=>
    (   params.formattedValue==="Delivered"?"cold":"redColor"
    )
    }
  ,
    {field:"amount",headerName:"Total Amount",minWidth:150,flex:0.5},
    {field:"action",headerName:"Actions",minWidth:150,type:"number",flex:0.5,sortable:false,
    renderCell:(params)=>{
      return (
        <Link to={`/order/${params.id}`}>
        <LaunchIcon/>
        </Link>
      )
    }   
  },

  ];
  const rows=[];
  orders && orders.forEach((item,index)=>{
    rows.push({
      id:item._id,
      itemsQty:item.orderItems.length,
      status:item.orderStatus,
      amount:item.totalPrice
    })
  })
  return (
    <Fragment>
      {loading?<Loader/>:<Fragment>
       <MetaData title={userFetched.name}/>
     <div className="myOrdersPage">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="myOrdersTable"
            autoHeight
          />

          <Typography id="myOrdersHeading">{userFetched.name}'s Orders</Typography>
        </div>
     
    </Fragment>}
    </Fragment>
    
  )
}

export default MyOrderDetails
