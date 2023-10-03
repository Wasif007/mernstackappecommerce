import React, { Fragment, useEffect, useState } from 'react'
import Carousel from "react-material-ui-carousel";
import { useDispatch,useSelector } from 'react-redux'
import { getSingleProductAdmin, reviewPostingAction } from '../../actions/productAction'
import {useParams} from "react-router-dom"
 import "./ProductDetails.css";
import Loader from '../layout/Loader/Loading';
import Review from '../layout/Review/review';
import MetaData from '../layout/MetaData';
import { addtoCart } from '../../actions/cartActions';
import { useNavigate } from 'react-router-dom';

import JSAlert from 'js-alert'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Rating } from '@mui/material';


const ProductDetails = () => {
   const [quantity,setQuantity]=useState(1);
   const [open, setOpen] = useState(false);
   const [rating, setRating] = useState(0);
   const [comment, setComment] = useState("");
   const navigate=useNavigate();
  const {error,success}=useSelector((state)=>state.review);
    let {id}=useParams();
    const dispatch=useDispatch();
   const {user}=useSelector(state=>state.user);
      const {productDetails,loading}=useSelector(state=>state.productDetails);
      const options = {
        size: "large",
        value: productDetails.ratings,
        readOnly: true,
       
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
      const submitReviewToggle=()=>{
        open?setOpen(false):setOpen(true)
      }
      const reviewSubmitHandler=(e)=>{
        e.preventDefault();
        const myForm =new FormData();
        myForm.set("rating",rating);
        myForm.set("comment",comment);
        myForm.set("productId",id);
        dispatch(reviewPostingAction(myForm));
        setOpen(false);
      }
      useEffect(() => {
        
        if(error)
        JSAlert.alert(error);
        if(success)
        JSAlert.alert("Review Successfully Posted")
        dispatch(getSingleProductAdmin(id));
      }, [dispatch,id,success,error,user,navigate]);
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
                       {" "}
                       <Rating {...options}/>
                       <span className="detailsBlock-2-span">
               
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
                   <button onClick={submitReviewToggle } className="submitReview">
                     Submit Review
                   </button>
     
                
                 </div> 
               </div>
               <h3 className="reviewsHeading">REVIEWS</h3>

<Dialog
  aria-labelledby="simple-dialog-title"
  open={open}
  onClose={submitReviewToggle}
>
  <DialogTitle>Submit Review</DialogTitle>
  <DialogContent className="submitDialog">
    <Rating
      onChange={(e) => setRating(e.target.value)}
      value={rating}
      size="large"
    />

    <textarea
      className="submitDialogTextArea"
      cols="30"
      rows="5"
      value={comment}
      onChange={(e) => setComment(e.target.value)}
    ></textarea>
  </DialogContent>
  <DialogActions>
    <Button onClick={submitReviewToggle} color="secondary">
      Cancel
    </Button>
    <Button onClick={reviewSubmitHandler} color="primary">
      Submit
    </Button>
  </DialogActions>
</Dialog>
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
