import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import Product from "./Product.js"
import MetaData from "../layout/MetaData";
import {useSelector,useDispatch} from "react-redux"
import {getAdminProduct} from "../../actions/productAction"

const product={
  name:"Wasif",
  price:50,
  image:[{url:"https://i.ibb.co/DRST11n/1.webp"}],
  _id:"wasifAteeq"
}
const Home = () => {
  const dispatch=useDispatch();
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
              <Product product={product}/>
              <Product product={product}/>
              <Product product={product}/>
              <Product product={product}/>
              <Product product={product}/>
              <Product product={product}/>
              <Product product={product}/>
              <Product product={product}/>
            </div>
         
      
      </Fragment>
    );
}

export default Home
