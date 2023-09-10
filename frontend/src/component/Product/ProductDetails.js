import React, { Fragment, useEffect } from 'react'
import {CgCarousel} from "react-material-ui-carousel"
import { useDispatch,useSelector } from 'react-redux'
import { getSingleProductAdmin } from '../../actions/productAction'
const ProductDetails = () => {
    const dispatch=useDispatch();
    useEffect(() => {
        dispatch(getSingleProductAdmin());
      }, [dispatch]);
      const {product,error,loading,productCount}=useSelector(state=>state.ProductDetails);

  return (
    <Fragment>
       <div className='ProductDetails'>
       <div>
            <CgCarousel>
        {
            product.images && product.images.map((img,i)=>(
                <img className='CarouselImage'
                key={img.url}
                src={img.url}
                alt={`${i} Slide`}
                />
                
                
            ))
        }
            </CgCarousel>
        </div>
       </div>
    </Fragment>
  )
}

export default ProductDetails
