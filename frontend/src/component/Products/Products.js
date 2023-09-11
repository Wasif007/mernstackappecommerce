import React, { Fragment, useEffect } from 'react'
import {useSelector,useDispatch} from "react-redux"
import { getAdminProduct } from '../../actions/productAction'
import Loader from '../layout/Loader/Loading'
import Product from '../Home/Product'
import "./Products.css"

const Products = () => {
    const dispatch=useDispatch();
    useEffect(() => {
        dispatch(getAdminProduct());
      }, [dispatch]);
      const {products,loading,productCount}=useSelector(state=>state.product);
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
   </Fragment>
  )
}

export default Products
