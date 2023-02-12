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
import cart1 from '../../assets/cart1.png'
import cart2 from '../../assets/cart2.png'
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
// import { useSelector } from 'react-redux'
// import StripeCheckout from 'react-stripe-checkout'
// import { publicRequest, userRequest } from '../../requestMethods' 
// import { useNavigate } from 'react-router-dom'

const Cart = () => {
  const KEY='pk_test_51MKhvSSG3siNDqLS6dujjGtMZHHKqf2P2LtV8bY8YQTqL7RSkk9II0vH00NkVSLdSRYkD229QJVXIB9OlYMJdpjU00kkD9wiBW';
  const [isEmpty,setEmpty]=useState(false)
  // const [count,setCount]=useState(1);
  const navigate=useNavigate()
  const cart=useSelector(state=>state.cart);
  const user=useSelector(state=>state.user.currentUser);
  const dispatch=useDispatch();
  // console.log(cart.products)


  // const countInc=()=>{
  //   setCount(count+1);
  // }

  // const countDec=()=>{
  //   if(count>1)
  //     setCount(count-1);
  // }

  // to remove product from cart
  const handleRemove=(item)=>{
    try{
      // dispatch(removeProduct(id));
      console.log(item)
      dispatch(removeProduct(item));
      window.location.reload();
    }catch(err){
      console.log(err);
    }
  }

  // to handle payment
  const handleToken=(totalAmount,token)=>{ // token is the response from stripe
    try{
      axios.post('http://localhost:5000/api/payment',{
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
            {console.log(c._id+"mnb njkb n")}

            <div className='leftCart'>
                <img className='cartImg' src={c.img} alt='no -img' />
                <div className='cartInfo'>
                  <p className='itemName'>{c?.title}</p>
                  <p className='itemDesc'>{c?.desc}</p>
                  <p className='cartsize'>{c.size ? c.size : "N/A"} || {c.color}</p>  
                {/* <div className='quantity'>
                    <button className='speech-bubble' onClick={()=>(c.quantity-1)}><RemoveIcon style={{border:'1px solid #999',borderRadius:'50%'}}/></button>
                    <button className='speech-bubble'>{c.quantity}</button>
                    <button className='speech-bubble' onClick={()=>(c.quantity+1)}><AddIcon style={{border:'1px solid #999',borderRadius:'50%'}}/></button>
                </div> */}
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

          {/* <div className='cartItem'>
            <div className='leftCart'>
                <img className='cartImg' src='https://images.unsplash.com/photo-1552346154-21d32810aba3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8c25lYWtlcnN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60' alt='no -img' />
                <div className='cartInfo'>
                  <p className='itemName'>Product Name is Lorem ipsum</p>
                  <p className='itemDesc'>Product Description is lorem ipsum 10 times 20 times etc...</p>
                  <p className='cartsize'>120x200cm || dark grey</p>  
                  <div className='quantity'>
                    <button className='speech-bubble'><RemoveIcon style={{border:'1px solid #999',borderRadius:'50%'}}/></button>
                    <button className='speech-bubble'>6</button>
                    <button className='speech-bubble'><AddIcon style={{border:'1px solid #999',borderRadius:'50%'}}/></button>
                </div>
                </div>
            </div>
            <div className='rightCart'>
              <IconButton className='icon' style={{color:'black'}} size='large'>
                <DisabledByDefaultIcon/>
              </IconButton>
              <div className='cartPrice'>
                <p className='times'>6x</p>
                <p className='Itemprice'>$456.89</p>
              </div>
            </div>
          </div>

          <div className='cartItem'>
            <div className='leftCart'>
                <img className='cartImg' src='https://images.unsplash.com/photo-1552346154-21d32810aba3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8c25lYWtlcnN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60' alt='no -img' />
                <div className='cartInfo'>
                  <p className='itemName'>Product Name is Lorem ipsum</p>
                  <p className='itemDesc'>Product Description is lorem ipsum 10 times 20 times etc...</p>
                  <p className='cartsize'>120x200cm || dark grey</p>  
                  <div className='quantity'>
                    <button className='speech-bubble'><RemoveIcon style={{border:'1px solid #999',borderRadius:'50%'}}/></button>
                    <button className='speech-bubble'>6</button>
                    <button className='speech-bubble'><AddIcon style={{border:'1px solid #999',borderRadius:'50%'}}/></button>
                </div>
                </div>
            </div>
            <div className='rightCart'>
              <IconButton className='icon' style={{color:'black'}} size='large'>
                <DisabledByDefaultIcon/>
              </IconButton>
              <div className='cartPrice'>
                <p className='times'>6x</p>
                <p className='Itemprice'>$456.89</p>
              </div>
            </div>
          </div> */}

          <div className='checkout'>
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
          </div>
        </div>
      </div>
    </>
  )
}

export default Cart

{/* <Button variant='contained' color='warning' style={{fontWeight:'bold',fontFamily:'cursive',marginLeft:'10px'}}><AddShoppingCartIcon />Cart</Button> */}
