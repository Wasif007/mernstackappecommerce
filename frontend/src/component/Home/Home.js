import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import Product from "./Product.js"
import MetaData from "../layout/MetaData";
import {useSelector,useDispatch} from "react-redux"
import {getAdminProduct} from "../../actions/productAction"


const Home = () => {
  const dispatch=useDispatch();
   const {products,error,loading,productCount}=useSelector(state=>state.product);
   
  useEffect(() => {
    dispatch(getAdminProduct());
  }, [dispatch]);
    return (
      <Fragment>
        
        <MetaData title="Ecommerce Website"/>
            <div className="banner">
              <p>Welcome to Ecommerce</p>
              <h1>FIND AMAZING PRODUCTS BELOW</h1>
  
              <a href="#container">
                <button>
                  Scroll <CgMouse />
                </button>
              </a>
            </div>
  
            <h2 className="homeHeading">Featured Products</h2>
  
            <div className="container" id="container">
             
              {/* <Product product={product}/> */}
              {products && products.map((product)=>
              <Product product={product} key={product._id}/>
              )}
             
              
            </div>
         
      
      </Fragment>
    );
}

export default Home
