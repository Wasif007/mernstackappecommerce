import React, { Fragment, useEffect, useRef } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import { Typography} from "@mui/material";
import { useNavigate } from 'react-router-dom';

import MetaData from "../../layout/MetaData";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import "./payment.css";
import CreditCardIcon from '@mui/icons-material/CreditCard';
import EventIcon from '@mui/icons-material/Event';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import JSAlert from 'js-alert'
import axios from "axios";
import { newOrderCreationAction } from "../../../actions/orderAction";


const Payment = () => {
      const elements=useElements();
      const stripe=useStripe();
      const navigate=useNavigate();
      const {shippingInfo,cartItem}=useSelector(state=>state.cart);
      const {userFetched}=useSelector(state=>state.user);
      const {orderInfo}=useSelector(state=>state.orderInfo);
      const order = JSON.parse(sessionStorage.getItem("orderInfo"));
      const dispatch=useDispatch();
      const payBtn=useRef(null);
      const paymentData={
        amount:Math.round(order.totalPrice*100),
      }
      const orderCreation={
        shippingInfo,
        orderItems:cartItem,
        itemsPrice:order.subtotal,
        taxPrice:order.tax,
        shippingPrice:order.shippingCharges,
        totalPrice:order.totalPrice
      }
    const submitHandler=async(e)=>{
      e.preventDefault();
      payBtn.current.disabled=true;
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const {data}=await axios.post("/api/v1/payment/process",paymentData,config);
        const client_secret=data.client_secret;
        if(!stripe || !elements)
        return;
        const result = await stripe.confirmCardPayment(client_secret, {
          payment_method: {
            card: elements.getElement(CardNumberElement),
            billing_details: {
              name: userFetched.name,
              email: userFetched.email,
              address: {
                line1: shippingInfo.address,
                city: shippingInfo.city,
                state: shippingInfo.state,
                postal_code: shippingInfo.pinCode,
                country: shippingInfo.country,
              },
            },
          },
        });
        if (result.error) {
          payBtn.current.disabled = false;
  
          JSAlert.alert(result.error);
        } 
        else {
          if (result.paymentIntent.status === "succeeded") {
            orderCreation.paymentInfo={
              id:result.paymentIntent.id,
              status:result.paymentIntent.status
            }
            dispatch(newOrderCreationAction(orderCreation));
            navigate("/success");
          } else {
            JSAlert.alert("There's some issue while processing payment ");
          }
        }

      } catch (error) {
        payBtn.current.disabled = false;
        JSAlert.alert(error.response.data.message);
        
      }


    }
 
  return ( 
    <Fragment>
       
      <MetaData title="Payment" />
      <CheckoutSteps activeStep={2} />
      <div className="paymentContainer">
        <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
          <Typography>Card Info</Typography>
          <div>
            <CreditCardIcon />
            <CardNumberElement className="paymentInput" />
          </div>
          <div>
            <EventIcon />
            <CardExpiryElement className="paymentInput" />
          </div>
          <div>
            <VpnKeyIcon />
            <CardCvcElement className="paymentInput" />
          </div>

          <input
            type="submit"
            value={`Pay - $${order && order.totalPrice}`}
            ref={payBtn}
            className="paymentFormBtn"
          />
        </form>
      </div> 
      
    </Fragment>
  )
}

export default Payment
