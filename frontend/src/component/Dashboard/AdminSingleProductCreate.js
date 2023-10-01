import React, { Fragment, useEffect, useState } from "react";
import "./AdminSingleProductCreate.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createProduct } from "../../actions/productAction";
import MetaData from "../layout/MetaData";
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import DescriptionIcon from '@mui/icons-material/Description';
import StorageIcon from '@mui/icons-material/Storage';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SideBar from "./Sidebar";
import { ADMIN_PRODUCT_CREATE_RESET } from "../../constants/productConstant";
const AdminSingleProductCreate = () => {
  return (
    <div>
      
    </div>
  )
}

export default AdminSingleProductCreate
