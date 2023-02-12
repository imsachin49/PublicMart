import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import './Cart.css'
import { Button, IconButton } from '@mui/material'
import { useState,useEffect } from 'react'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { useSelector } from 'react-redux'
import StripeCheckout from 'react-stripe-checkout'
import { publicRequest, userRequest } from '../../requestMethods' 
import { useNavigate } from 'react-router-dom'
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Divider from '@mui/material/Divider';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import {removeProduct} from '../../redux/cartRedux'
import { useDispatch } from 'react-redux'
import Stripe from 'react-stripe-checkout'
import axios from 'axios'

const Cart = () => {
  const KEY='pk_test_51MKhvSSG3siNDqLS6dujjGtMZHHKqf2P2LtV8bY8YQTqL7RSkk9II0vH00NkVSLdSRYkD229QJVXIB9OlYMJdpjU00kkD9wiBW';
  const [isEmpty,setEmpty]=useState(false)
  const navigate=useNavigate()
  const cart=useSelector(state=>state.cart);
  const user=useSelector(state=>state.user.currentUser);
  const dispatch=useDispatch();
  // length of cart
  const cartLength=cart.products.length;
  console.log(cartLength)

  const handleRemove=(item)=>{
    try{
      dispatch(removeProduct(item));
      window.location.reload();
    }catch(err){
      console.log(err);
    }
  }

  const handleToken=(totalAmount,token)=>{
    try{
      axios.post('https://full-stack-ecommerce-mu.vercel.app/api/checkout/payment',{
        token:token.id,
        amount:cart.total*100
        });
        navigate('/success')
    }catch(err){
      console.log(err)
    }
  }

  const tokenHandler=(token)=>{
    handleToken(100,token)
  }
    

  return (
    <>
      <div className='cart-wrapper'>
        <div className='cart-main'>
          <div className='cartTitle'>SHOPPING CART</div>

          {cart.products.map((c)=>{return (
            <div className='cartItem'>
            <div className='leftCart'>
                <img className='cartImg' src={c.img} alt='no -img' />
                <div className='cartInfo'>
                  <p className='itemName'>{c?.title}</p>
                  <p className='itemDesc'>{c?.desc}</p>
                  <p className='cartsize'>{c.size ? c.size : "N/A"} || {c.color}</p>  
                </div>
            </div>
            <div className='rightCart'>
              <IconButton className='icon' style={{color:'black'}} size='large' onClick={() => handleRemove(c)}>
                <DisabledByDefaultIcon/>
              </IconButton>
              <div className='cartPrice'>
                <p className='times'>{c.quantity}</p>
                <p className='Itemprice'>${c.price}</p>
              </div>
            </div>
          </div>)})}

          {cartLength>0 && <div className='checkout'>
            <div className='checkoutContainer'>
              <div className='checkoutLeft' style={{paddingTop:'10px'}}>
                <p className='subTotal'>Subtotal</p>
                <p className='subTotalAmount'>${cart.total}</p>
              </div>      
              <div className='checkoutLeft'>
                <p className='subTotal'>Delivery</p>
                <p className='subTotalAmount'>$100.0</p>
              </div> 
              <Divider variant="middle" style={{width:'93%',display:'flex',margin:'auto',backgroundColor:'#333'}}/>

              <div className='checkoutLeft' id="hii">
                <p className='totalText'>Total</p>
                <p className='totalAmount'>${cart.total+100}</p>
              </div> <Divider variant="middle" style={{width:'93%',display:'flex',margin:'auto',backgroundColor:'#333'}}/>

              <div className='preNext'>
                <Button className='back' variant='contained' style={{margin:'20px',backgroundColor:'white',color:'black',border:'1px solid black'}}><ChevronLeftIcon size='small'/>GO BACK</Button>
               <Stripe stripeKey={KEY} token={tokenHandler}>
                <Button className='next' variant='contained' style={{margin:'20px',backgroundColor:'black'}}>CHECKOUT<NavigateNextIcon size='small'/></Button>
                </Stripe>
              </div>

            </div>
          </div>}
        </div>
      </div>
    </>
  )
}

export default Cart

{/* <Button variant='contained' color='warning' style={{fontWeight:'bold',fontFamily:'cursive',marginLeft:'10px'}}><AddShoppingCartIcon />Cart</Button> */}
