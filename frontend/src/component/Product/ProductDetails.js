import React, { Fragment, useEffect, useState } from 'react'
import Carousel from "react-material-ui-carousel";
import { useDispatch,useSelector } from 'react-redux'
import { getSingleProductAdmin } from '../../actions/productAction'
import {useParams} from "react-router-dom"
 import "./ProductDetails.css";
import Loader from '../layout/Loader/Loading';
import Review from '../layout/Review/review';
import ReactStars from 'react-rating-stars-component'
import MetaData from '../layout/MetaData';
import { addtoCart } from '../../actions/cartActions';
import JSAlert from 'js-alert'


const ProductDetails = () => {
   const [quantity,setQuantity]=useState(1);
    let {id}=useParams();
    const dispatch=useDispatch();
    useEffect(() => {
        dispatch(getSingleProductAdmin(id));
      }, [dispatch,id]);
      const {productDetails,loading}=useSelector(state=>state.productDetails);
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
      const increaseQuantity=()=>{

        
        if(productDetails.Stock <=quantity){
          return;
        }
        let quan=quantity+1;
        setQuantity(quan);
      }
      const decreaseQuantity=()=>{
        
        if(1 >=quantity){
          return;
        }
        let quan=quantity-1;
        setQuantity(quan);
     
      }
      const addtoCartFun=()=>{
        dispatch(addtoCart(id,quantity));
        JSAlert.alert("Item added to Cart");

      }
  return (
    <Fragment>
      {
        loading?<Loader/>:(<Fragment>
          <MetaData title={`${productDetails.name}--Ecommerce`}/>
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
                         <button onClick={decreaseQuantity}>-</button>
                         <input readOnly type="number" value={quantity} />
                         <button onClick={increaseQuantity}>+</button>
                       </div>
                       <button
                         disabled={productDetails.Stock < 1 ? true : false}
                         onClick={addtoCartFun}
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
