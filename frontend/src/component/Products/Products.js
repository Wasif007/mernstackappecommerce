import React, { Fragment, useEffect, useState } from 'react'
import {useSelector,useDispatch} from "react-redux"
import { getAdminProduct } from '../../actions/productAction'
import Loader from '../layout/Loader/Loading'
import Product from '../Home/Product'
import "./Products.css"
import { useParams } from 'react-router-dom'
import Pagination from "react-js-pagination";
import { Slider, Typography } from '@mui/material'
import MetaData from '../layout/MetaData'

const categories=[
"Footwear",
"Laptop",
"Mobiles",
"Cosmetics"]
const Products = () => {
    let keywordFromParam=useParams();

    const [currentPage,setCurrentPage]=useState(1);
    const [price,setPrice]=useState([0,25000]);
    const [category,setCategory]=useState("");
    const [ratings,setRatings]=useState(0);


    const dispatch=useDispatch();
    const setCurrentPageNo=(e)=>{
setCurrentPage(e);
    }
    const priceHandler=(event,settingPrice)=>{
        setPrice(settingPrice);
    }
    useEffect(() => {
        dispatch(getAdminProduct(keywordFromParam.keyword,currentPage,price,category,ratings));
      }, [dispatch,keywordFromParam,currentPage,price,category,ratings]);
      const {products,loading,productCount,resultPerPage,count}=useSelector(state=>state.product);
      
        return (
   <Fragment>
    {
        loading?<Loader/>:<Fragment>
            <MetaData title="PRODUCTS--Ecommerce"/>
            <h2 className='productsHeading'>Products</h2>
            <div className='products'>
                {
                    products && products.map((product)=>{
                      return  <Product key={product._id} product={product}/>
                    })
                }
            </div>
        </Fragment>
    }
    <div className='filterBox'>
        <Typography>Price</Typography>
        <Slider
         value={price}
         onChange={priceHandler}
         valueLabelDisplay="auto"
         aria-labelledby="range-slider"
         min={0}
         max={25000}
         />
         <Typography>Categories</Typography>
         <ul
         className='categoryBox'
         >{categories.map((category)=>{
          return  <li
            className='category-link'
            key={category}
            onClick={()=>setCategory(category)}
            >
                {category}
            </li>
         })}</ul>
         <fieldset>
            <Typography className='legend'>Ratings Above</Typography>
            <Slider
             value={ratings}
             onChange={(e,rating)=>{
                setRatings(rating)
             }}
             valueLabelDisplay="auto"
             aria-labelledby="continous-slide"
             min={0}
             max={5}
            />

         </fieldset>
    </div>
    <div className='paginationBox'>
        {   
            resultPerPage<count && 
                <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            
        }
    
    </div>
   </Fragment>
  )
}

export default Products
