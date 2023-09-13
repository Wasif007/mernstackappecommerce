import React, { Fragment, useEffect, useState } from 'react'
import {useSelector,useDispatch} from "react-redux"
import { getAdminProduct } from '../../actions/productAction'
import Loader from '../layout/Loader/Loading'
import Product from '../Home/Product'
import "./Products.css"
import { useParams } from 'react-router-dom'
import Pagination from "react-js-pagination";
const Products = () => {
    let keywordFromParam=useParams();
    console.log(keywordFromParam);
    const [currentPage,setCurrentPage]=useState(1);

    const dispatch=useDispatch();
    const setCurrentPageNo=(e)=>{
setCurrentPage(e);
    }
    useEffect(() => {
        dispatch(getAdminProduct(keywordFromParam.keyword,currentPage));
      }, [dispatch,keywordFromParam,currentPage]);
      const {products,loading,productCount,resultPerPage}=useSelector(state=>state.product);
      console.log(productCount,resultPerPage);
  return (
   <Fragment>
    {
        loading?<Loader/>:<Fragment>
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
    <div className='paginationBox'>
        {
            productCount>resultPerPage && 
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
