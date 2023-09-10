import React, { Fragment, useEffect } from 'react'
import Carousel, {CgCarousel} from "react-material-ui-carousel"
import { useDispatch,useSelector } from 'react-redux'
import { getSingleProductAdmin } from '../../actions/productAction'
import {useParams} from "react-router-dom"


const ProductDetails = () => {
    let {id}=useParams();
    console.log(id);
    const dispatch=useDispatch();
    useEffect(() => {
        dispatch(getSingleProductAdmin(id));
      }, [dispatch,id]);
      const {productDetails,error,loading,productCount}=useSelector(state=>state.productDetails);
      console.log(productDetails);
  return (
    
    <>
      <Fragment>
       <div className='ProductDetails'>
       <div>
            <Carousel>
         {
            productDetails.images && productDetails.images.map((img,i)=>(
                <img className='CarouselImage'
                key={img.url}
                src={img.url}
                alt={`${i} Slide`}
                />
                
                
            ))
        } 
            </Carousel>
        </div>
       </div>
    </Fragment>  
    </>
  )
}

export default ProductDetails
