import React, { Fragment, useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid/DataGrid';
import "./AdminAllProducts.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import MetaData from "../layout/MetaData";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SideBar from "./Sidebar";
import {
    deleteSingleOrderAdmin,
    getAllOrdersForAdmin,
    clearAllErrorFunc,
} from "../../actions/orderAction";
import { ADMIN_ORDER_DELETE_RESET } from "../../constants/orderConstant";
import { Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';

import JSAlert from 'js-alert'

const AdminAllOrders = () => {
  const dispatch = useDispatch();

  const navigate=useNavigate();

  const {  error,orders } = useSelector((state) => state.adminAllOrders);

  
  const {message, error: deleteError, isDeleted } = useSelector(
     (state) => state.adminOrderDelete
   );
  const deleteOrderHandler = (id) => {
    dispatch(deleteSingleOrderAdmin(id));
  };

  useEffect(() => {
    if (error) {
      JSAlert.alert(error);
      dispatch(clearAllErrorFunc());
    }

    if (deleteError) {
        JSAlert.alert(deleteError);
      dispatch(clearAllErrorFunc());
    }

    if (isDeleted) {
        JSAlert.alert("Order Deleted Successfully");
      navigate("/admin/orders");
      dispatch({ type: ADMIN_ORDER_DELETE_RESET });
    }
console.log("Hello1");
    dispatch(getAllOrdersForAdmin());
    console.log("Hello2");  
}, [dispatch, error, deleteError, navigate, isDeleted]);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName:(params)=>
      {
        return params.id==="Delivered"?"cold":"redColor"
      } ,
      
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.4,
    },

    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/order/${params.id}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteOrderHandler(params.id)
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  orders &&
  orders.forEach((item) => {
      rows.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        amount: item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL ORDERS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL ORDERS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default AdminAllOrders;
