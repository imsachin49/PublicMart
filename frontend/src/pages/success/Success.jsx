import React from 'react'
import { Link } from 'react-router-dom'
import './Success.css'
import done from '../../assets/success.png'

const Success = () => {
  return (
    <div className="success">
      <div className="successContainer">
        <div className='doneP'>
          <img src={done} alt="done" className="donePay" height={80} width={80} />
        </div>
        <div className="thanks">
          Thanks for shopping with us!
        </div>
        <div className="orderPlaced">
          Your order has been placed successfully.
        </div>
        <div className="queryP">
          For any product related query, drop an email to
        </div>
        <div className="underline">publicmart@myshop.com</div>
        <Link to="/" className="contShop">
          Continue Shopping
        </Link>
      </div>
    </div>
  )
}

export default Success