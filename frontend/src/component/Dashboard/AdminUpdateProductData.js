import React, { Fragment, useEffect, useState } from "react";
import "./AdminSingleProductCreate.css";
import { useSelector, useDispatch } from "react-redux";
import {clearAllErrorFunc,  getSingleProductAdmin, updateSingleProductAdmin } from "../../actions/productAction";
import MetaData from "../layout/MetaData";
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import DescriptionIcon from '@mui/icons-material/Description';
import StorageIcon from '@mui/icons-material/Storage';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SideBar from "./Sidebar";
import { ADMIN_PRODUCT_UPDATE_RESET } from "../../constants/productConstant";
import { useNavigate, useParams } from 'react-router-dom';

import JSAlert from 'js-alert'

import { Button } from "@mui/material";
const AdminUpdateProductData = () => {
    let {id}=useParams();
    
    const dispatch = useDispatch();
    const navigate=useNavigate();
    const { loading, error, success,productDetails} = useSelector((state) => state.productDetails);
    const {isUpdated}=useSelector((state)=>state.productUpdate);
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [Stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    const [oldImage,setOldImage]=useState([]);
    useEffect(() => {
      
        if(productDetails && productDetails._id!==id){
            dispatch(getSingleProductAdmin(id));
        }
        else{
            setName(productDetails.name);
      setDescription(productDetails.description);
      setPrice(productDetails.price);
      setCategory(productDetails.category);
      setStock(productDetails.Stock);
      setOldImage(productDetails.images);
        }
        if (error) {
          JSAlert.alert(error);
          dispatch(clearAllErrorFunc());
        }
    
        if (isUpdated) {
          JSAlert.alert("Product Updated Successfully");
          navigate("/show/all/admin/products");
          dispatch({ type: ADMIN_PRODUCT_UPDATE_RESET });
        }
      }, [dispatch, error, navigate, success,isUpdated,id,productDetails]);
    
    const categories = [
        "Laptop",
        "Footwear",
        "Bottom",
        "Tops",
        "Attire",
        "Camera",
        "SmartPhones",
      ];
      const updateProductImagesChange = (e) => {
        const files = Array.from(e.target.files);
    
        setImages([]);
        setImagesPreview([]);
        setOldImage([]);
        files.forEach((file) => {
          const reader = new FileReader();
    
          reader.onload = () => {
            if (reader.readyState === 2) {
              setImagesPreview((old) => [...old, reader.result]);
              setImages((old) => [...old, reader.result]);
            }
          };
    
          reader.readAsDataURL(file);
        });
      };
      const updateProductSubmitHandler = (e) => {
        e.preventDefault();
    
        const myForm = new FormData();
    
        myForm.set("name", name);
        myForm.set("price", price);
        myForm.set("description", description);
        myForm.set("category", category);
        myForm.set("Stock", Stock);
    
        images.forEach((image) => {
          myForm.append("images", image);
        });
        console.log(id,name,price,description,category,Stock,images)
        dispatch(updateSingleProductAdmin(id,myForm));
      };
  return (
    <Fragment>
    <MetaData title="Create Product" />
    <div className="dashboard">
      <SideBar />
      <div className="newProductContainer">
        <form
          className="createProductForm"
          encType="multipart/form-data"
          onSubmit={updateProductSubmitHandler}
        >
          <h1>Create Product</h1>

          <div>
            <SpellcheckIcon />
            <input
              type="text"
              placeholder="Product Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <AttachMoneyIcon />
            <input
              type="number"
              placeholder="Price"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div>
            <DescriptionIcon />

            <textarea
              placeholder="Product Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              cols="30"
              rows="1"
            ></textarea>
          </div>

          <div>
            <AccountTreeIcon />
            <select onChange={(e) => setCategory(e.target.value)} value={category}>
              <option value="">Choose Category</option>
              
              {categories.map((cate) => (
                <option key={cate} value={cate}>
                  {cate}
                </option>
              ))}
            </select>
          </div>

          <div>
            <StorageIcon />
            <input
              type="number"
              placeholder="Stock"
              required
              value={Stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </div>

          <div id="createProductFormFile">
            <input
              type="file"
              name="avatar"
              accept="image/*"
              required
              onChange={updateProductImagesChange}
              multiple
            />
          </div>
          <div id="createProductFormImage">
            {oldImage.map((image, index) => (
              <img key={index} src={image.url} alt="Old Product Preview" />
            ))}
          </div>


          <div id="createProductFormImage">
            {imagesPreview.map((image, index) => (
              <img key={index} src={image} alt="Product Preview" />
            ))}
          </div>

          <Button
            id="createProductBtn"
            type="submit"
            disabled={loading ? true : false}
          >
            Create
          </Button>
        </form>
      </div>
    </div>
  </Fragment>
  )
}

export default AdminUpdateProductData
