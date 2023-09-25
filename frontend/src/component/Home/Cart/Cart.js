import React, { Fragment } from 'react'
import "./Cart.css"
import CartItemCard from './CartItemCard'
import {useSelector,useDispatch} from "react-redux"
import { addtoCart, removeFromCart } from '../../../actions/cartActions'

const Cart = () => {
    const dispatch=useDispatch();
    const {cartItem}=useSelector(state=>state.cart);
const increaseProductCount=(id,quantity,Stock)=>{
    let newQuan=quantity+1;
   
    if(Stock<=quantity){
        return;
    }
    dispatch(addtoCart(id,newQuan));

}
const decreaseProductCount=(id,quantity)=>{
    let newQuan=quantity-1;
   
    if(1>=quantity){
        return;
    }
    dispatch(addtoCart(id,newQuan));

}
const deleteProductFCart=(id)=>{
dispatch(removeFromCart(id));
}
  return (
    <Fragment>
    <div className="cartPage">
      <div className="cartHeader">
        <p>Product</p>
        <p>Quantity</p>
        <p>Subtotal</p>
      </div>
      {
        cartItem && cartItem.map((item)=>(
            <div className='cartContainer' key={item.product}>
        <CartItemCard item={item}  deleteProductFCart={deleteProductFCart}/>
        <div className='cartInput'>
            <button onClick={()=> {return increaseProductCount(item.product,item.quantity,item.Stock)}}>+</button>
            <input readOnly value={item.quantity}/>
            <button onClick={()=> {return decreaseProductCount(item.product,item.quantity)}}>-</button>
        </div>
        <p className='cartSubtotal'>
        {item.quantity*item.price}
        </p>
      </div>
        ))
      }
      <div className='cartGrossProfit'>
        <div></div>
        <div className='cartGrossProfitBox'>
        <p>Gross Profit</p>
        <p>{`$500`}</p>
        </div>
        <div></div>
        <div className='checkOutBtn'>
            <button>Check Out</button>
        </div>
      </div>
      </div>
      </Fragment>
  )
}

export default Cart
