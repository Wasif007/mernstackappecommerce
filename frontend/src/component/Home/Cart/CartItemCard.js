import React from 'react'
import "./CartItemCard.css"
import {Link} from 'react-router-dom'

const CartItemCard = ({item,deleteProductFCart}) => {
  return (
    <div className='CartItemCard'>
      <img src={item.image} alt='pic'/>
      <div >
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <span>{`${item.price}$`}</span>
        <p onClick={()=>{return deleteProductFCart(item.product)}}>Remove</p>
      </div>
    </div>
  )
}

export default CartItemCard
