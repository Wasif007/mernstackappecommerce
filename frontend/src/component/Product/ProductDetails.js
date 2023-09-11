import React, { Fragment, useEffect } from 'react'
import Carousel from "react-material-ui-carousel";
import { useDispatch,useSelector } from 'react-redux'
import { getSingleProductAdmin } from '../../actions/productAction'
import {useParams} from "react-router-dom"
 import "./ProductDetails.css";
import Loader from '../layout/Loader/Loading';
import Review from '../layout/Review/review';
import ReactStars from 'react-rating-stars-component'



const ProductDetails = () => {
   
    let {id}=useParams();
    const dispatch=useDispatch();
    useEffect(() => {
        dispatch(getSingleProductAdmin(id));
      }, [dispatch,id]);
      const {productDetails,error,loading}=useSelector(state=>state.productDetails);
      const options = {
        size: "large",
        value: productDetails.ratings,
        readOnly: true,
        precision: 0.5,
        edit:false,
        color:"rgba(20,20,20,0.1)",
        activeColor:"tomato",
        isHalf:true
      };
  return (
    <Fragment>
      {
        loading?<Loader/>:(<Fragment>
          <div className="ProductDetails">
                 <div>
                   <Carousel className='CarouselImage'>
                     {productDetails.images &&
                       productDetails.images.map((item, i) => (
                         <img 
                           key={i}
                           src={item.url}
                           alt={`${i} Slide`}
                         />
                       ))}
                   </Carousel>
                 </div>
     
                  <div className='mainBlock'>
     
                   <div className="detailsBlock-1">
                     <h2>{productDetails.name}</h2>
                     <p>Product # {productDetails._id}</p>
                   </div>
     
     
                   <div className="detailsBlock-2">
                     <span className="detailsBlock-2-span">
                       {" "}
                       <ReactStars {...options}/>
                       ({productDetails.numOfReviews} Reviews)
                     </span>
                   </div>
     
                   <div className="detailsBlock-3">
                     <h1>{`$${productDetails.price}`}</h1>
                     <div className="detailsBlock-3-1">
                       <div className="detailsBlock-3-1-1">
                         <button >-</button>
                         <input readOnly type="number"  />
                         <button >+</button>
                       </div>
                       <button
                         disabled={productDetails.Stock < 1 ? true : false}
                         
                       >
                         Add to Cart
                       </button>
                     </div>
                     <p>
                       Status:
                       <b className={productDetails.Stock < 1 ? "redColor" : "greenColor"}>
                         {productDetails.Stock < 1 ? "OutOfStock" : "InStock"}
                       </b>
                     </p>
                    
                   </div>
                   <div className="detailsBlock-4">
                     Description : <p>{productDetails.description}</p>
                   </div>
                   <button  className="submitReview">
                     Submit Review
                   </button>
     
                
                 </div> 
               </div>
               <h3 className="reviewsHeading">REVIEWS</h3>
               {productDetails.reviews && productDetails.reviews[0] ? (
                 <div className="reviews">
                   {productDetails.reviews &&
                     productDetails.reviews.map((review) => (
                       <Review key={review._id} review={review} />
                     ))}
                 </div>
               ) : (
                 <p className="noReviews">No Reviews Yet</p>
               )}
     
               
     
         </Fragment>  )
      }
    </Fragment>
            
      
  )
}

export default ProductDetails
